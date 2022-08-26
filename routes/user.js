import express from "express"
import { deleteUserFromId, findAllUser, findUserFromId, updateUserFromId, userStats } from "../controllers/user.controller.js"
import {verifyTokenAndAdmin, verifyTokenAndAuthorization} from "../middlewares/verifyToken.js"


const router = express.Router()

// EDIT USER
router.put('/:id',verifyTokenAndAuthorization,updateUserFromId)

// DELETE USER
router.delete('/:id',verifyTokenAndAuthorization,deleteUserFromId)

// GET USER BY ID <only admin>
router.get('/find/:id',verifyTokenAndAdmin,findUserFromId)

// ALL USER <only admin>
router.get('/',verifyTokenAndAdmin,findAllUser)

// USER STATS
router.get('/stats',verifyTokenAndAdmin,userStats)

export default router
