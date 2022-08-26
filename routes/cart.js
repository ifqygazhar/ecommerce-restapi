import express from "express"
import { createCart, deleteCart, findAll, findById, updateCart } from "../controllers/cart.controller.js"
import {verifyTokenAndAdmin, verifyTokenAndAuthorization} from "../middlewares/verifyToken.js"


const router = express.Router()

//CREATE CART
router.post('/:id',verifyTokenAndAuthorization,createCart)

// EDIT CART
router.put('/:id/:cartId',verifyTokenAndAuthorization,updateCart)

// DELETE CART
router.delete('/:id/:cartId',verifyTokenAndAuthorization,deleteCart)

// GET CART BY ID 
router.get('/find/:id',verifyTokenAndAuthorization,findById)

// // ALL CART 
router.get('/',verifyTokenAndAdmin,findAll)


export default router
