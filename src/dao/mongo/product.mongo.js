import { productModel } from "./models/product.model.js"

export default class Product {
    constructor() {}

    getAllPaginate = async(category, filters) => {
        return await productModel.paginate(category, filters)
    }

    getAll = async() => {
        return await productModel.find();
    }

    getOne = async(id) => {
        return await productModel.findById(id);
    }

    getOneByFilter = async(filter) => {
        return await productModel.findOne(filter);
    }

    add = async(product) => {
        return await productModel.create(product)
    }

    update = async(id, obj) => {
        return await productModel.findByIdAndUpdate({ _id: id }, obj)
    }

    delete = async(id) => {
        return await productModel.findByIdAndDelete(id)
    }

    deleteAll = async() => {
        return await productModel.deleteMany({})
    }


}