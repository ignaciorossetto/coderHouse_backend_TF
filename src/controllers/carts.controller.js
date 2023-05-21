import { CartService } from "../repository/index.js";
import CustomError from "../services/errors/customError.js";

  export const getAllCarts = async (req, res, next) => {
    try {
      const response = await CartService.getAll();
      if (!response) {
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Could not get carts from DB",
          cause: 'Server Error'
        })
      }
      res.json(response);
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      next(error)
    }
  }
  
  export const getCartById = async (req, res, next) => {
    try {
      const response = await CartService.getOne({_id: req.params.id});
      if (!response) {
        CustomError.createError({
          name: "Invalid cart id",
          code: 2,
          status: 401,
          message: "El id del carrito no es correcto",
          cause: 'Bad request'
        })
        return;
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      return next(error)
      
    }
  }
  
  export const addCart = async (req, res, next) => {
    try {
      const response = await CartService.create(req.body);
      if (!response) {
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Could not create new cart",
          cause: 'Server Error'
        })       
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      next(error)
    }
  }
  
  export const updateCart = async (req, res, next) => {
    // to update nested objects: use "object.title": "new title"  
    try {
      const id = req.params.id;
      const obj = req.body;
      const response = await CartService.update(id, obj);
      if (!response) {
        CustomError.createError({
          name: "Not updated",
          code: 2,
          status: 401,
          message: "Could not update cart",
          cause: 'Bad request'
        })
        return;
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      next(error)
    }
  }
  
  export const deleteCartById = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await CartService.deleteOne(id);
      if(!response){
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Error deleting cart",
          cause: 'Server error'
        })
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      next(error)
    }
  }
  
  export const deleteall = async (req, res) => {
    try {
      const response = await CartService.deleteAll({});
      if (!response) {
        return CustomError.createError({
          name: "DB error",
          code: 2,
          status: 500,
          message: "Error deleting carts",
          cause: 'Server error'
        })
      }
      res.json({ cart: response, status: "success" });
    } catch (error) {
      req.logger.fatal({Name: error.name, Message: error.message})
      next(error)
    }
  }

  









