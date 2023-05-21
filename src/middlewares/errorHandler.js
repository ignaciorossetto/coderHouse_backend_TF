import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
    switch(error.code){
        case EErrors.ROUTING_ERROR:
            res.status(error.status).json({
                status: "error",
                error: error.name,
                code: error.code,
                message: error.message
            })
            break
        default:
            const status = error.status || 500
            res.status(status).json({
                status: "error",
                error: error.name || 'Unhandled',
                code: error.code || 1,
                message: error.message || ''
            })
    }
}