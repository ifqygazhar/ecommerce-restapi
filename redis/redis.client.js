import redis from "redis"
import JWTR from "jwt-redis"

export const redis_client = redis.createClient({host: process.env.REDIS_HOST, port: process.env.REDIS_PORT})
redis_client.on('error',(err) => console.log(`Redis: ${err}`))  
redis_client.on('connect',() => console.log("redis connected"))
await redis_client.connect()
const sett = JWTR.default
export const jwtr = new sett(redis_client)