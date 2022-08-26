import User from "../models/User.js"


export async function updateUserFromId(req,res) {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
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
        message: "success update user",
        user: {
            username: updateUser.username,
            email: updateUser.email,
            createdAt: updateUser.createdAt,
            updatedAt: updateUser.updatedAt 
        }
    })

    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "user not found"
        })
    }
}

export async function deleteUserFromId(req,res) {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            code: 200,
            message: "success delete user"
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "user not found"
        })
    }
}

export async function findUserFromId(req,res){
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json({
            code: 200,
            message: "success get id",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "user not found"
        })
    }
}

export async function findAllUser(req,res){
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
        return res.status(200).json({
            code: 200,
            message: "success get all users",
            users: users
        })
    } catch (err) {
        return res.status(404).json({
            code: 404,
            message: "user not found"
        })
    }
}

export async function userStats(req,res){
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { 
                $match: {
                 createdAt: { 
                    $gte: lastYear 
                } 
              } 
            },

            {
              $project: {
                month: { 
                    $month: "$createdAt" 
                },
              },
            },

            {
              $group: {
                _id: "$month",
                total: { $sum: 1 },
              },
            },

          ])
       return res.status(200).json(data)   
    } catch (err) {
       return res.status(500).json(err) 
    }
}