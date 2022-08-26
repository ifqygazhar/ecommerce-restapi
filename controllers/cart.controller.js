import Cart from "../models/Cart.js"


export async function createCart(req,res){
    const newCart = new Cart({
        userId: req.params.id,
        products: req.body.products
    })

    try {
        const savedCart = await newCart.save()
        return res.status(201).json({
            code: 201,
            message: "success add new Cart",
            cart: savedCart
        })
    } catch (err) {
       return res.status(400).json({
            code: 400,
            message: "failed add new Cart"
       }) 
    }
}

export async function updateCart(req,res){
    try {
        const updateCart = await Cart.findByIdAndUpdate(
        req.params.cartId,
        {
            $set: req.body
        },
        {
            new:true
        }
    )
    
    return res.status(200).json({
        code: 200,
        message: "success update Cart",
        cart: updateCart 
    })

    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Cart not found"
        })
    }
}

export async function deleteCart(req,res){
    try {
        await Cart.findByIdAndDelete(req.params.cartId)
        return res.status(200).json({
            code: 200,
            message: "success delete Cart"
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Cart not found"
        })
    }
}

export async function findById(req,res){
    try {
        const cart = await Cart.find({userId: req.params.id})
        return res.status(200).json({
            code: 200,
            message: "success get cart",
            cart: cart 
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Cart not found"
        })
    }
}

export async function findAll(req,res){
    try {
        const carts = await Cart.find()
        return res.status(200).json({
            code: 200,
            message: "success get all carts",
            carts: carts
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "carts not found"
        })
    }
}