import { cartModel } from "./models/carts.model.js";

export default class Cart {
    constructor() {}

    getAll = async() => {
        return await cartModel.find()
    }

    getOne = async(id) => {
        return await cartModel.findOne(id)
    }

    create = async(cart) => {
        return await cartModel.create(cart)
    }

    update = async(id, obj) => {
        return await cartModel.findByIdAndUpdate({ _id: id }, obj);
    }

    deleteOne = async(id) => {
        return await cartModel.findByIdAndDelete(id)
    }

    deleteAll = async() => {
        return await cartModel.deleteMany({})
    }

    

}