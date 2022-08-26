import express from "express"
import { createProduct, deleteProduct, findAllProduct, findProductById, updateProduct } from "../controllers/product.controller.js"
import {verifyTokenAndAdmin} from "../middlewares/verifyToken.js"


const router = express.Router()

//CREATE PRODUCT
router.post('/',verifyTokenAndAdmin,createProduct)

// EDIT PRODUCT
router.put('/:id',verifyTokenAndAdmin,updateProduct)

// DELETE PRODUCT
router.delete('/:id',verifyTokenAndAdmin,deleteProduct)

// GET PRODUCT BY ID 
router.get('/find/:id',verifyTokenAndAdmin,findProductById)

// ALL PRODUCT 
router.get('/',verifyTokenAndAdmin,findAllProduct)


export default router
