import { ProductService } from "../repository/index.js";
import CustomError from "../services/errors/customError.js";


export const getAllProducts = async (req, res, next) => {
  let categoryName = req.query.category
  const catQuery = categoryName === undefined || categoryName === 'undefined'  ? {} : {category: categoryName}
  const limitQuery = req.query.limit === undefined ? 1000 : req.query.limit
  const pageQuery = req.query.page || 1
  const sortQuery = req.query.sort

  try {
      const response = await ProductService.getAllPaginate(catQuery, {
        limit: limitQuery, page: pageQuery, sort: sortQuery === 'asc' ? {price:1} : sortQuery === 'desc' ? {price:-1} : {}
      })
      if (!response) {
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Could not get products from DB",
          cause: 'Server Error'
        }) 
      }
      if(categoryName === "men's clothing" || categoryName === "women's clothing"){
        categoryName = categoryName.replace("'", "-")
      }
      return res.status(200).json({
        status: 'success',
        payload:response.docs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:5000/api/products?sort=${sortQuery}&category=${categoryName}&limit=${limitQuery}&page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:5000/api/products?sort=${sortQuery}&category=${categoryName}&limit=${limitQuery}&page=${response.nextPage}` : null,
      })
    
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    next(error)
  }
};

export const getProductById = async (req, res, next) => {
  const ide = req.params.id;

  if (ide === 'categories') {
    try {
      const response = await ProductService.getAll();
      if (!response) {
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Could not get categories from DB",
          cause: 'Server Error'
        })
      }
      const Prod_categories = response.map(({category})=> (category))
      const categories = [...new Set(Prod_categories)]
      return res.status(200).json(categories);
      
    } catch (error) {
      req.logger.warn({Name: error.name, Message: error.message})
      next(error)
    }
  }

  try {
    const id = req.params.id;
    const response = await ProductService.getOne(id);
    if (!response) {
      return CustomError.createError({
        name: "Bad request",
        code: 2,
        status: 404,
        message: "Product not found",
        cause: 'Bad request'
      })
    }
    res.json({ product: response, status: "success" });
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    next(error)
  }
};

export const addProduct = async (req, res, next) => {
  // body must be like product model, anyway all fields are requiredx
  try {
    if (req.user._id === req.body.owner || req.user.admin) {
      const obj = {...req.body}
      obj['image'] = `/static/multimedia/users_folder/${config.mode}/${req.user._id}/products/${req.file.originalname}`
      const response = await ProductService.add(obj);
      if (!response) {
        return CustomError.createError({
          name: "Bad request",
          code: 2,
          status: 404,
          message: "Error creating product",
          cause: 'Bad request'
        })
      }
      return res.json({ product: response, status: "success"});
    }
    return CustomError.createError({
      name: "Unauthorized",
      code: 2,
      status: 401,
      message: "No puedes crear productos a nombre de otro",
      cause: 'Bad request'
    })
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    next(error)
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const response = await ProductService.update(id, obj);
    if (!response) {
      return CustomError.createError({
        name: "Bad request",
        code: 2,
        status: 404,
        message: "Error updating product",
        cause: 'Bad request'
      })
    }
    res.json({ product: response, status: "success" });
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    return next(error)
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await ProductService.getOne(id);
    if (req.user._id === product.owner || req.user.admin) {
      const response = await ProductService.delete(id);
      if (!response) {
        return CustomError.createError({
          name: "Bad request",
          code: 2,
          status: 404,
          message: "Error deleting product",
          cause: 'Bad request'
        })
      }
      return res.json({ status: "success", message: 'Producto eliminado' });
    }
    return CustomError.createError({
      name: "Bad request",
      code: 2,
      status: 404,
      message: "No eres el dueño del producto!",
      cause: 'Bad request'
    })
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    return next(error)
  }
};

export const deleteall = async (req, res) => {
  try {
    const response = await ProductService.deleteAll();
    if (!response) {
      return CustomError.createError({
        name: "Bad request",
        code: 2,
        status: 404,
        message: "Error deleting products",
        cause: 'Bad request'
      })
    }
    res.json({ product: response, status: "success" });
  } catch (error) {
    req.logger.warn({Name: error.name, Message: error.message})
    next(error)
  }
};

