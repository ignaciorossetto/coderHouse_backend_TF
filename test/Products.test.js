import { ProductService } from '../src/repository/index.js'
import { before, describe } from 'mocha'
import chai from 'chai'
import {faker} from '@faker-js/faker'

const expect = chai.expect

describe('Testing CRUD for Product Service', ()=> {

    it('It must return all products', async () => {
        const result = await ProductService.getAll()
        expect(result).to.be.an('array')
    })

    it('It must create a new product', async () => { 
        const result = await ProductService.add({
            title: 'PRODUCTO_TEST_MODULE_TO_BE_DELETED',
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            category: 'test',
            image: faker.image.technics(),
            code: faker.random.word(),
            stock: 5,
        })
        expect(result).to.have.property('_id')
    })

    it('It must return one product by _id', async () => {
        const result = await ProductService.getAll()
        const firstProduct = result[0]
        const id = firstProduct._id
        const product = await ProductService.getOne({_id: id})
        expect(product._id).to.be.deep.equal(id)
    })

    it('It should create a new product and update its name', async () => { 
        const newProduct = await ProductService.add({
            title:faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            category: 'test',
            image: faker.image.technics(),
            code: faker.random.word(),
            stock: 5,
        })
        const id = newProduct._id
        await ProductService.update(id, {
            title: 'PRODUCTO_TEST_MODULE_TO_BE_DELETED_2'
        })
        const product = await ProductService.getOne({_id: id})
        expect(product.title).to.be.deep.equal('PRODUCTO_TEST_MODULE_TO_BE_DELETED_2')

      })

      it('It must get products created above and delete them both', async () => { 

        const product_1 = await ProductService.getOneByFilter({title: 'PRODUCTO_TEST_MODULE_TO_BE_DELETED'})
        const product_2 = await ProductService.getOneByFilter({title: 'PRODUCTO_TEST_MODULE_TO_BE_DELETED_2'})
        await ProductService.delete(product_1._id)
        await ProductService.delete(product_2._id)

        const product_1_deleted = await ProductService.getOne({_id: product_1._id})
        const product_2_deleted = await ProductService.getOne({_id: product_2._id})
        expect(product_1_deleted).to.be.equal(null)
        expect(product_2_deleted).to.be.equal(null)
    })

})