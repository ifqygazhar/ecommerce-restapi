const requiredLoginMiddleware = (req,res,next) => {
    //security
  if (!req.body.username) {
    return res.status(400).json({
       code: 400,
       message: "required username"
     })
   }else if (!req.body.password) {
     return res.status(400).json({
       code: 400,
       message: "required password"
     })
   }
   
   next()
}

export default requiredLoginMiddleware