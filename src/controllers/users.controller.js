import __dirname, {
  createHash,
  generateToken,
  isValidPassword,
} from "../utils.js";
import { UserService, CartService } from "../repository/index.js";
import CustomError from "../services/errors/customError.js";
import { generateUser } from "../config/faker.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Mail from "../utils/mail.js";
import fs from "fs";
import path from "path";

export const createUser = async (req, res) => {
  res.redirect("http://localhost:5000/login?register=success");
};

export const logIn = async (req, res) => {
  if (!req.user)
    return CustomError.createError({
      name: "Invalid Credentials",
      code: 4,
      status: 401,
      message: "Invalid credentials, login to access.",
    });
  let user = { ...req.user };
  delete user.password;
  const access_token = generateToken(user);
  res
    .cookie("coderCookieToken", access_token)
    .redirect(
      `http://localhost:5000/products?login_status=success&name=${req.body.email}`
    );
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("coderCookieToken");
    res.redirect(`http://localhost:5000/login?logout_status=success`);
    return;
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    res.render(`/errors/base`, {
      error: "Hubo un problema! Lo estamos solucionando.",
    });
    return;
  }
};

export const checkLogIn = async (req, res) => {
  const id = req.user.user._id || req.user.user._doc._id;
  const user = await UserService.getOne({ _id: id });
  delete user?.password;
  req.user = user;
  let currentCart = req.user.carts.find((c) => c.confirmed === false);
  if (!currentCart) {
    const newCart = await CartService.create({});
    await UserService.update(user._id, {
      $push: { carts: { cart: newCart._id, confirmed: false } },
    });
    currentCart = req.user.carts.find((c) => c.confirmed === false);
  }
  const {dni, address, accStatement} = user.documents
  if (user.type === 'user' && dni.status === 'approved' && address.status === 'approved' && accStatement.status === 'approved') {
    await UserService.update(id, {$set: {type: 'premium'}}) 
  }
  try {
    res.json({ user: { ...req.user._doc, currentCart } });
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    res.render(`/errors/base`, {
      error: "Hubo un problema! Lo estamos solucionando.",
    });
    return;
  }
};

export const googleLoginCallback = async (req, res) => {
  try {
    if (!req.user)
      return CustomError.createError({
        name: "Invalid credentials",
        code: 4,
        status: 401,
        message: "Las credenciales no son validas",
        cause: "Bad request",
      });
    let user = { ...req.user };
    delete user._doc.password;
    const access_token = generateToken(user);
    res
      .cookie("coderCookieToken", access_token)
      .redirect(`http://localhost:5000/products?login_status=success`);
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    next(error);
  }
};

export const googleFailedLogin = async (req, res) => {
  res.redirect(`http://localhost:5000/login?login_status=Gfailed`);
};

export const modifyUser = async (req, res) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const response = await UserService.update(id, obj);
    if (!req.user)
      return CustomError.createError({
        name: "Cart not updated",
        code: 4,
        status: 500,
        message: "Could not update the cart",
        cause: "Server Error",
      });
    res.json({ user: response, status: "success" });
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { currentPass, newPass } = req.body;
  const email = req.user.user.email;
  try {
    const user = await UserService.getOne({ email });
    if (!user) {
      CustomError.createError({
        name: "Invalid Credentials",
        code: 4,
        status: 401,
        message: "User not found",
        cause: "",
      });
      return;
    }
    if (user.strategy !== "local") {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message:
          "Los usuarios creados con google no pueden cambiar la contrasena",
        cause:
          "Los usuarios creados con google no pueden cambiar la contrasena",
      });
      return;
    }
    if (!isValidPassword(user, currentPass)) {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message: "La contrasena actual es incorrecta",
      });
      return;
    }
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    return next(error);
  }

  const hashedPass = createHash(newPass);
  try {
    await UserService.update(user._id, { password: hashedPass });
    res.redirect("/private?passwordchange=success");
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    next(
      CustomError.createError({
        name: "Password not changed",
        code: 4,
        status: 500,
        message: "Could not change the password",
        cause: "Server Error",
      })
    );
  }
};

export const changeProfileImg = async (req, res, next) => {
  try {
    const id = req.user.user._doc._id;
    const _path = `/static/multimedia/users_folder/${config.mode}/` + id + "/profile";
    const newName = req.file.originalname.replace(/\s/g, "_");
    const obj = {
      profileImg: _path + "/" + newName,
    };
    const response = await UserService.update(id, obj);
    if (!response)
      return CustomError.createError({
        name: "User profile image not updated",
        code: 4,
        status: 500,
        message: "Could not update profile image",
        cause: "Server Error",
      });
    res.redirect("http://localhost:5000/private/");
  } catch (error) {
    next(error);
  }
};

export const premiumReq = async (req, res, next) => {
  try {
    const id = req.user.user._doc._id;
    const { file } = req.params;
    const _path = __dirname + `/users_folder/${config.mode}/` + id + "/documents/" + file;
    let filesArr = fs.readdirSync(_path);
    let filesPathArr = []
    for (let i = 0; i < filesArr.length; i++) {
      const fileName = '/' + filesArr[i]
      const filePath = path.join(_path, fileName)
      filesPathArr.push(filePath);
    }
    const obj = {
      $set: {
        [`documents.${file}.reference`]: filesPathArr,
        [`documents.${file}.status`]: 'pending',
      },
    };
    await UserService.update(id, obj) 
    res.redirect('/private/premiumReq')

  } catch (error) {
    next(error)
  }
};

export const changePremReqStatus = async(req,res,next) => {
  try {   
    const {file} = req.params
    const id = req.user.user._doc._id
    const obj = {
      $set: {
        [`documents.${file}.status`]: 'approved'
      }
    }
    await UserService.update(id, obj)
    res.redirect('http://localhost:5000/private/premiumReq')
  } catch (error) {
   next(error) 
  }
}

export const confirmedSale = async (req, res) => {
  try {
    const id = req.params.id;
    const newCart = await CartService.create({});
    const response = await UserService.update(id, obj);
    res.redirect("/products");
  } catch (error) {
    req.logger.warn({ Name: error.name, Message: error.message });
    next(
      CustomError.createError({
        name: "Sale not confirmed",
        code: 4,
        status: 500,
        message: "Could not complete the sale",
        cause: "Server Error",
      })
    );
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await UserService.getOne({ email: req.body.email });
    if (!user) {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message: "No existe un usuario con ese mail",
      });
    }
    if (user.strategy !== "local") {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message:
          "Los usuarios registrados con Google no pueden cambiar contraseña",
      });
    }
    const token = jwt.sign({ user }, config.jwtSecret + user.password, {
      expiresIn: "15m",
    });
    const link = `http://localhost:5000/changePassword?token=${token}&email=${req.body.email}`;
    const Mailer = new Mail();
    const html = ` 
    <h1>Hola ${user.name}</h1>
    <p>Para cambiar tu contraseña, ingresa al siguiente <a href=${link}><strong>Link</strong></a></p>
    <br>
    <p>Recuerda que el link expira en 15 minutos.</p>
    `;
    try {
      await Mailer.send(user, "Cambio de contrasena", html);
      res.json({
        status: "success",
        message: "Verifica tu mail",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const changePass = async (req, res, next) => {
  const newPass = req.body.password;
  const token = req.body.token;
  const email = req.body.email;
  try {
    const user = await UserService.getOne({ email: email });
    if (!user) {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message: "No existe un usuario con ese mail",
      });
    }
    const userAuth = jwt.verify(token, config.jwtSecret + user.password);
    if (!userAuth) {
      CustomError.createError({
        name: "error",
        code: 4,
        status: 404,
        message: "Error al cambiar contraseña",
      });
    }
    const newEncPass = createHash(newPass);
    try {
      await UserService.update(userAuth.user._id, { password: newEncPass });
      res.json({
        status: "success",
        message: "Contrasena cambiada con exito",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getFakeUsers = async (req, res) => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push(generateUser());
  }

  res.json({
    status: "success",
    payload: users,
  });
};

export const changeUserType = async (req, res, next) => {
  const userId = req.params.uid;
  const user = await UserService.getOne({ _id: userId });
  if (user.type === "user") {
    await UserService.update(userId, { type: "premium" });
  } else await UserService.update(userId, { type: "user" });

  res.json({
    status: "success",
  });
};
