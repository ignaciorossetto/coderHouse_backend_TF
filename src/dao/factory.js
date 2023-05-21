import config from "../config/config.js";
import mongoose from "mongoose";

let DAO

switch (config.persistence) {
    case 'mongo':
        mongoose.connect(config.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        }, () => console.log('Mongo db connected'))
        DAO = {}
         const {default: CartsMongo } = await import('./mongo/carts.mongo.js')
         const {default: MessagesMongo } = await import('./mongo/messages.mongo.js')
         const {default: ProductMongo } = await import('./mongo/product.mongo.js')
         const {default: UserMongo } = await import('./mongo/user.mongo.js')
         DAO.Carts = CartsMongo
         DAO.Messages = MessagesMongo
         DAO.Product = ProductMongo
         DAO.User = UserMongo

        break
    } 

export default DAO