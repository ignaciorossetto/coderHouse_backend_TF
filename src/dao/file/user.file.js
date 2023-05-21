import FileManager from './file_manager.js'

export default class User {

    constructor() {
        this.fileManager = new FileManager('user.json')
    }

    getAll = async() => {
        return await this.fileManager.getAll()
    }

    getOne = async(filter) => {
        return await this.fileManager.getOne(filter)
    }

    update = async(id, obj) => {
        return await this.fileManager.update(id, obj)
    }

    create = async(user) => {
        return await this.fileManager.create(user)
    }

}