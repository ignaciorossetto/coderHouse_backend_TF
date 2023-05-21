import UserDTO from '../dao/dto/user.dto.js'

export default class CartRepository {

    constructor(dao){
        this.dao = dao
    }

    getAll = async() => {
        return await this.dao.getAll()
    }

    getOne = async(filter) => {
        return await this.dao.getOne(filter)
    }

    update = async(id, obj) => {
        return await this.dao.update(id, obj)
    }

    create = async(user) => {
        const userToInsert = new UserDTO(user)
        return await this.dao.create(userToInsert)
    }

    delete = async(id) => {
        return await this.dao.delete(id)
    }

    deleteAll = async() => {
        return await this.dao.deleteAll()
    }


}