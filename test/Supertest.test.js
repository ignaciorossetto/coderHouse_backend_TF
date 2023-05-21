import chai from "chai";
import supertest from 'supertest'
import {faker} from '@faker-js/faker'
import config from '../src/config/config.js'
import { UserService } from "../src/repository/index.js";
import app from '../src/app.js'
import fs from 'fs'
import fsExtra from 'fs-extra'
import __dirname from "../src/utils.js";

const expect = chai.expect
const requester = supertest(app)
                       
describe('Testing sign up and login process, setting a cookie.', () => {
    
    let user
    let cookie

    it('Register a new user', async () => { 
        const mockUser = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            password: "secret",
        }
        await requester.post('/api/users').send(mockUser)
        user = await UserService.getOne({email: mockUser.email})

        expect(user.email).to.be.deep.equal(mockUser.email)
    })
    it('Check if public folders were created', async () => { 
        //public folders
        expect(fs.existsSync(__dirname + `/public/multimedia/users_folder/${config.mode}/${user._id}`)).to.be.deep.equal(true)
        expect(fs.existsSync(__dirname + `/public/multimedia/users_folder/${config.mode}/${user._id}/profile`)).to.be.deep.equal(true)
        expect(fs.existsSync(__dirname + `/public/multimedia/users_folder/${config.mode}/${user._id}/products`)).to.be.deep.equal(true)
            
     })  

     it('Check if private folders were created', async () => { 
         //private folders
         expect(fs.existsSync(__dirname + `/users_folder/${config.mode}/${user._id}`)).to.be.deep.equal(true)
         expect(fs.existsSync(__dirname + `/users_folder/${config.mode}/${user._id}/documents`)).to.be.deep.equal(true)
         expect(fs.existsSync(__dirname + `/users_folder/${config.mode}/${user._id}/documents/dni`)).to.be.deep.equal(true)
         expect(fs.existsSync(__dirname + `/users_folder/${config.mode}/${user._id}/documents/address`)).to.be.deep.equal(true)
         expect(fs.existsSync(__dirname + `/users_folder/${config.mode}/${user._id}/documents/accStatement`)).to.be.deep.equal(true)
        })

    
    it('Login process and get a cookie as response.', async() => { 
        const {headers} = await requester.post('/api/users/login').send({email: user.email, password: 'secret'})
        const cookieResult = headers['set-cookie'][0]
        expect(cookieResult).to.be.ok
        cookie = {
            name: cookieResult.split('=')[0],
            value: cookieResult.split('=')[1]
        }
        expect(cookie.name).to.be.deep.equal('coderCookieToken')
        expect(cookie.value).to.be.ok
     })

     it('Send cookie to get the information of the user', async()=> {
        const { _body } = await requester.get('/api/users/check').set('Cookie', [`${cookie.name}=${cookie.value}`])
        expect(_body.user.email).to.be.deep.equal(user.email)
     })


    after(async ()=>{
        // comment line below if want to check mongo Atlas that users exist
        await UserService.deleteAll()
        // comment line below if want to check that directories exists
        setTimeout(()=>{
            // timeout to see how folders are created and then deleted
            fsExtra.emptyDirSync(__dirname + `/public/multimedia/users_folder/${config.mode}`)
            fsExtra.emptyDirSync(__dirname + `/users_folder/${config.mode}`)
        }, 3000)
    })
     
 })

