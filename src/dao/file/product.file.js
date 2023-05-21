import FileManager from './file_manager.js'
export default class Product {
    constructor() {
        this.fileManager = new FileManager('products.json')
    }

    getAllPaginate = async(category, filters) => {
        const docs = await this.fileManager.getAll()
        return {
            totalDocs: docs.lenght,
            docs,
            limit: 1,
            page: 1,
            nextPAge: null,
            prevPage: null,
            totalPages: 1,
            pagingCounter: 1,
            meta: 'paginator'
        }
    }

    getAll = async() => {
        return await fileManager.getAll();
    }

    getOne = async(id) => {
        return await fileManager.getOne(id);
    }

    add = async(product) => {
        return await fileManager.create(product)
    }

    update = async(id, obj) => {
        return await fileManager.update({ _id: id }, obj)
    }

    delete = async(id) => {
        return await fileManager.delete(id)
    }

    deleteAll = async() => {
        return await fileManager.deleteAll()
    }


}