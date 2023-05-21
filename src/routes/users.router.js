import { Router } from "express";
import {
    createUser,
    logIn,
    logOut,
    checkLogIn,
    googleLoginCallback,
    modifyUser,
    googleFailedLogin,
    changePassword,
    getFakeUsers,
    forgotPassword,
    changePass,
    changeUserType,
    changeProfileImg,
    premiumReq,
    changePremReqStatus
} from '../controllers/users.controller.js'
import __dirname, { passportCall } from "../utils.js";
import {
    uploadProfileImg,
    uploadDocs
} from "../utils/multerConfig.js";


const router = Router()

router.post('/', passportCall('register', {failureRedirect: '/register?register_status=failed', session: false}), createUser)
router.post('/login', passportCall('login',{failureRedirect: '/login?login_status=failed', session: false}), logIn)
router.get('/login/google', passportCall('google', {prompt : "select_account", session: false}), (req,res)=>{})
router.get('/login/google/callback', passportCall('google',{failureRedirect: '/api/users/login/google/callback/failed', session: false}), googleLoginCallback)
router.get('/login/google/callback/failed', googleFailedLogin)
router.get("/logout",passportCall('jwt'), logOut)
router.get("/check",passportCall('jwt'), checkLogIn)
router.put("/changePassword",passportCall('jwt'), changePassword)
router.post("/modify/:id",passportCall('jwt'), modifyUser)
router.post("/forgotpass", forgotPassword)
router.post("/changepass", changePass)
router.post("/changeProfileImg",passportCall('jwt'), uploadProfileImg.single('profileImg') ,changeProfileImg)
router.post("/premiumReq/:file",passportCall('jwt'), uploadDocs.array('premiumReq') ,premiumReq)
router.get("/premium/:uid", changeUserType)
router.get("/changePremiumReqStatus/:file",passportCall('jwt'), changePremReqStatus)
router.get('/fakerjs', getFakeUsers)



export default router;
