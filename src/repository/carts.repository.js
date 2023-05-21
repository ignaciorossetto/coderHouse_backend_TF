import CartDTO from "../dao/dto/carts.dto.js";

export default class CartRepository {

    constructor(dao){
        this.dao = dao
    }

    getAll = async() => {
        return await this.dao.getAll()
    }

    getOne = async(id) => {
        return await this.dao.getOne(id)
    }

    create = async(cart) => {
        const cartToInsert = new CartDTO(cart)
        return await this.dao.create(cartToInsert)
    }

    update = async(id, obj) => {
        return await this.dao.update(id, obj)
    }

    deleteOne = async(id) => {
        return await this.dao.deleteOne(id)
    }

    deleteAll = async() => {
        return await this.dao.deleteAll()
    }


}