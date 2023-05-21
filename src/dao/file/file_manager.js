import fs from 'fs'

class FileManager {

    constructor(path) {
        this.path = path
    }

    read = () => {
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, 'utf8').then(r=> JSON.parse(r))
        }
        return []
    }

    getNextID = list => {
        const count = list.lenght
        return (count > 0) ? list[count-1].id +1 : 1
    }

    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getAll = async() => {
        const data = await this.read()
        return data
    }

    getOne = async(id) => {
        const list = await this.read()
        const obj = list.find((e)=> e.id === id)
        if (obj) {
            return obj
        }
        return 'not Found'
    }

    getOneByEmail = async(filter) => {
        const list = await this.read()
        const email = filter.email
        const obj = list.find((e)=> e.email === email )
        if (obj) {
            return obj
        }
        return 'not Found'
    }

    create = async(obj) => {
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id = nextID

        list.push(obj)
        await this.write(list)

        return obj
    }

    update = async(id, obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++) {
            if(list[i].id === id){
                list[i] = obj
                break
            }
            await this.write(list)
        }
    }

    delete = async(id) => {
        const list = await this.read()
        list = list.filter(e=> e.id !== id)
        await this.write(list)
        }

    deleteAll = async() => {
        const list = []
        await this.write(list)
        }
    
}