import Product from "../models/Product.js"

export async function createProduct(req,res) {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        categories: req.body.categories,
        size: req.body.size.toUpperCase(),
        color: req.body.color,
        price: req.body.price
    })

    try {
        const savedProduct = await newProduct.save()
        return res.status(201).json({
            code: 201,
            message: "success add new product",
            product: savedProduct
        })
    } catch (err) {
       return res.status(400).json({
            code: 400,
            message: "failed add new product"
       }) 
    }
}

export async function updateProduct(req,res) {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        {
            new:true
        }
    )
    
    return res.status(200).json({
        code: 200,
        message: "success update product",
        product: { updateProduct }
    })

    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "product not found"
        })
    }
}

export async function deleteProduct(req,res) {
    try {
        await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            code: 200,
            message: "success delete product"
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "product not found"
        })
    }
}

export async function findProductById(req,res){
    try {
        const product = await Product.findById(req.params.id)
        return res.status(200).json({
            code: 200,
            message: "success get id",
            product: { product }
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "product not found"
        })
    }
}

export async function findAllProduct(req,res){
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products

        if (qNew) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            })
        }else {
            products = await Product.find().limit(5)
        }

        return res.status(200).json({
            code: 200,
            message: "success get all products",
            products: products
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "products not found"
        })
    }
}
