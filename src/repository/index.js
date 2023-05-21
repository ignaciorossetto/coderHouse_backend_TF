import  DAO  from "../dao/factory.js";
import ProductRepository from './product.repository.js'
import CartRepository from "./carts.repository.js";
import UserRepository from './user.repository.js'


export const ProductService = new ProductRepository(new DAO.Product())
export const CartService = new CartRepository(new DAO.Carts())
export const UserService = new UserRepository(new DAO.User())