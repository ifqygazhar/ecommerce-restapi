import express from "express"
import requiredRegisterMiddleware from "../middlewares/requiredRegister.js"
import requiredLoginMiddleware from "../middlewares/requiredLogin.js"
import { verifyTokenAndAuthorization, verifyTokenRedis } from "../middlewares/verifyToken.js"
import { Login, Logout, Register } from "../controllers/auth.controller.js"

const router = express.Router()

//register
router.post('/register',requiredRegisterMiddleware,Register)

//login
router.post('/login',requiredLoginMiddleware,Login)

//logout
router.post('/logout/:id',verifyTokenAndAuthorization,verifyTokenRedis,Logout)

//refresh
router.post('/refresh',(req,res) => {
  
})

export default router
