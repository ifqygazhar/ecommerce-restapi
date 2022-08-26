import Order from "../models/Order.js"

export async function createOrder(req,res){
    const newOrder = new Order({
        userId: req.params.id,
        products: req.body.products,
        amount: req.body.amount,
        address: req.body.address,
        status: req.body.status
    })

    try {
        const savedOrder = await newOrder.save()
        return res.status(201).json({
            code: 201,
            message: "success add new Order",
            order: savedOrder
        })
    } catch (err) {
       return res.status(400).json({
            code: 400,
            message: "failed add new Order"
       }) 
    }
}

export async function updateOrder(req,res){
    try {
        const updateOrder = await Order.findByIdAndUpdate(
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
        message: "success update Order",
        order: { updateOrder }
    })

    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Order not found"
        })
    }
}

export async function deleteOrder(req,res) {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            code: 200,
            message: "success delete Order"
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Order not found"
        })
    }
}

export async function findById(req,res){
    try {
        const order = await Order.find({userId: req.params.id})
        return res.status(200).json({
            code: 200,
            message: "success get Order",
            order: { order }
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "Order not found"
        })
    }
}

export async function findAllOrder(req,res){
    try {
        const orders = await Order.find()
        return res.status(200).json({
            code: 200,
            message: "success get all orders",
            orders: orders
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "orders not found"
        })
    }
}

export async function income(req,res){
    const date = new Date()
    const lastMonth = new Date(date.getMonth(date.setMonth) - 1)
    const previousMonth = new Date(new Date().getMonth(lastMonth.setMonth) - 1)

    try {
        const income = await Order.aggregate([
            { 
                $match: { 
                    createdAt: { 
                        $gte: previousMonth 
                    } 
                } 
            },

            {
              $project: {
                month: { 
                    $month: "$createdAt" 
                },
                sales: "$amount",
              },
            },

            {
              $group: {
                _id: "$month",
                total: {
                     $sum: "$sales" 
                },
              },
            },
        ])
        return res.status(200).json(income)
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "no income"
        })
    }
}