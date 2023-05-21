import { userModel } from "./models/user.model.js";

export default class User {

    constructor() {}

    getAll = async() => {
        return await userModel.find()
    }

    getOne = async(filter) => {
        return await userModel.findOne(filter)
    }

    update = async(id, obj) => {
        return await userModel.findByIdAndUpdate(id, obj)
    }

    create = async(user) => {
        return await userModel.create(user)
    }

    delete = async(id) => {
        return await userModel.findByIdAndDelete(id)
    }

    deleteAll = async() => {
        return await userModel.deleteMany({})
    }

}