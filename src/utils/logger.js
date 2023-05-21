import winston from "winston";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug'
        }),
        new winston.transports.File({
            level: 'info',
            filename: './errors.log'
        })
    ]
})

export const addLogger = (req,res,next) => { 
    req.logger = logger
    next()
 }