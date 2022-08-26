import express from "express"
import { createOrder, deleteOrder, findAllOrder, findById, income, updateOrder } from "../controllers/order.controller.js"
import {verifyTokenAndAdmin, verifyTokenAndAuthorization} from "../middlewares/verifyToken.js"


const router = express.Router()

//CREATE ORDER
router.post('/:id',verifyTokenAndAuthorization,createOrder)

// EDIT ORDER
router.put('/:id',verifyTokenAndAdmin,updateOrder)

// DELETE ORDER
router.delete('/:id',verifyTokenAndAdmin,deleteOrder)

// GET ORDER BY ID 
router.get('/find/:id',verifyTokenAndAuthorization,findById)

// ALL ORDER 
router.get('/',verifyTokenAndAdmin,findAllOrder)

// INCOME STATS
router.get('/income',verifyTokenAndAdmin,income)

export default router
