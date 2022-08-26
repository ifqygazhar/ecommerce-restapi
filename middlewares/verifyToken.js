import jwt from "jsonwebtoken"
import { jwtr } from "../redis/redis.client.js"

export const verifyToken = (req,res,next) => {
    const autHeader = req.headers.token
    if (autHeader) {
        const token = autHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    message: "Token is not valid!"
                })
            }
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({
            code: 401,
            message: "You are not authenticate!"
        })
    }
}

export const verifyTokenAndAuthorization = async (req,res,next) => {
    verifyToken(req,res,() => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                code: 403,
                message: "You are not allowed do that!"
            })
        }
    })
}

export const verifyTokenAndAdmin = (req,res,next) => {
     verifyToken(req,res,() => {
        if (req.user.isAdmin) {
            next()
        }else {
            return res.status(403).json({
                code: 403,
                message: "You are not allowed do that!"
            })
        }
    })
}

export const verifyTokenRedis = async (req,res,next) => {
    const autHeader = req.headers.token
    if (autHeader) {
        const token = autHeader.split(" ")[1]
        await jwtr.verify(token,process.env.JWT_SEC)
        .then((user) => {
            req.user = user
            next()
        })
        .catch((err) => {
            return res.status(403).json({
                code: 403,
                message: `Token is not valid! ${err}`
            })
        })
    }
}

