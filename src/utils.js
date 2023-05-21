import {dirname} from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import config from './config/config.js'

const PRIVATE_KEY = config.jwtSecret

export const passportCall = (strategy, obj) => {

    return async(req,res,next) => {
        passport.authenticate(strategy, obj,  function(err, user, info) {
            if (err) {
                return next(err)
            }
            if(!user){
                return res.status(401).render('errors/base', {
                    error: info?.messages ? info.messages : info?.toString()
                })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

export const createHash = (password) => {
    const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return hashedPass
}

export const isValidPassword = (user, password) =>{
    const comparedPass = bcrypt.compareSync(password, user.password)
    return comparedPass
}

export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname