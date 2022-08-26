import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user.js"
import authRoute from "./routes/auth.js"
import productRoute from "./routes/product.js"
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"


const app = express()

dotenv.config()


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo server is running"))
  .catch((err) => {
    console.log(err)
  })



app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)

app.listen(process.env.PORT,() => {
  console.log("Backend server is running")
})
