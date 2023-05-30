import { productModel } from "../dao/mongo/models/product.model.js";


export const indexView = async (req, res) => {

  res.render("home", {});
};

export const productsViewWithSocket = async (req, res) => {
    const response = await productModel.find();
    const io = req.app.get('io')
    io.on('connection',(socket)=> {
        socket.emit('products', response)
        socket.on('productsModified', async(data) => {
            await productModel.create(data);
            const products = await productModel.find();
            io.emit('products', products)
          })
        socket.on('deleteProduct', async(data) => {
            const id = data
            await productModel.findByIdAndDelete(id.trim());
            const products = await productModel.find();
            io.emit('products', products)
          })
        
    })

     res.render("realTimePRoducts", {});

};

export const productsView = async (req, res) => {
  
  res.render("products", {});
};

export const productView = async (req, res) => {
  res.render("product", {});
};

export const loginView = async (req, res) => {
  res.render("login", {});
};
export const registerView = async (req, res) => {
  res.render("register", {});
};

export const privateView = async (req, res) => {
  res.render("layouts/user/private", {user: req.user});
};

export const privateInfoView = async (req, res) => {
  res.render("layouts/user/privateInfo", {user: req.user});
};
export const changeProfileImgView = async (req, res) => {
  res.render("layouts/user/changeProfile", req.user);
};

export const lastPurchasesView = async (req, res) => {
  res.render("layouts/user/lastPurchases", {user: req.user});
};
export const lastPurchasesInfoView = async (req, res) => {
  const id = req.params.id
  res.render("layouts/user/lastPurchasesInfo", {user: req.user, cartId: id});
};
export const changePasswordView = async (req, res) => {
  res.render("layouts/user/changePassword", {user: req.user});
};
export const adminView = async (req, res) => {
  res.render("admin", {admin: 'Bienvenido Admin'});
};
export const forgotPass = async (req, res) => {
  res.render("forgotPass");
};
export const changePass = async (req, res) => {
  res.render("changePass");
};
export const addProductView = async (req, res) => {
  res.render("addProduct");
};
export const premiumRequirementsView = async (req, res) => {
  res.render("layouts/user/premiumRequirements");
};
