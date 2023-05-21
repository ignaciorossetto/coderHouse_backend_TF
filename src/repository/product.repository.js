import ProductDTO from '../dao/dto/product.dto.js'

export default class ProductRepository {
    constructor(dao){
        this.dao = dao
    }

    getAllPaginate = async(category, filters) => {
        return await this.dao.getAllPaginate(category, filters)
    }

    getAll = async() => {
        return await this.dao.getAll()
    }

    getOne = async(id) => {
        return await this.dao.getOne(id)
    }

    getOneByFilter = async(filter) => {
        return await this.dao.getOneByFilter(filter)
    }

    add = async(product) => {
        const productToInsert = new ProductDTO(product)
        return await this.dao.add(productToInsert)
    }

    update = async(id, obj) => {
        return await this.dao.update(id, obj)
    }

    delete = async(id) => {
        return await this.dao.delete(id)
    }

    deleteAll = async() => {
        return await this.dao.deleteAll()
    }
    


}