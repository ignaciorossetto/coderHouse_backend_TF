import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'production')
program.parse()

const environment = program.opts().mode

dotenv.config({
    path: environment == "test" ? './.env.test' : environment == 'dev' ? './.env.dev' : './.env.production'
})

export default {
    port: process.env.PORT,
    localHost: process.env.DEV_LOCAL_HOST,
    persistence: process.env.PERSISTENCE,
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallBackUrlEndpoint: process.env.GOOGLE_CALLBACK_URL_ENDPOINT,
    jwtSecret: process.env.JWT_SECRET,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mode : process.env.MODE
}