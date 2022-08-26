import User from "../models/User.js"
import CryptoJS from "crypto-js"
import {jwtr} from "../redis/redis.client.js"

export async function Register(req, res) {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  })

  try {
    const savedUser = await newUser.save()
    return res.status(201).json({
      code: 201,
      messages: "success register user",
      user: {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      }
    })
  } catch (err) {
    return res.status(409).json({
      code: 409,
      message: "failed create user"
    })
  }
}

export async function Login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "wrong credentials"
      })
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    if (originalPassword !== req.body.password) {
      return res.status(404).json({
        code: 404,
        message: "wrong credentials"
      })
    }

    const accessToken = await jwtr.sign({id: user._id,isAdmin: user.isAdmin},process.env.JWT_SEC,{ expiresIn: process.env.JWT_ACCESS_TIME })
    const refresh_token = await jwtr.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_REFRESH_SECRET,{ expiresIn: process.env.JWT_REFRESH_TIME })
    
    return res.status(200).json({
      code: 200,
      message: "success login user",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: {
        tokenType: "Bearer",
        accessToken: accessToken,
        refresh_token: refresh_token
      }
    })
  } catch (err) {
    return res.status(409).json({
      code: 409,
      message: `failed login user`
    })
  }
}

export async function Logout(req, res) {
    try {

    const user = await User.findById(req.params.id)
    await jwtr.destroy({id: user._id,isAdmin: user.isAdmin},process.env.JWT_SEC)

    return res.status(200).json({
      code: 200,
      message: "success logout"
    })

    }catch(err) {
      return res.status(404).json({
        code: 404,
        message: "user not found"
      })
    }
    
}

export async function getToken(req,res){
  
}