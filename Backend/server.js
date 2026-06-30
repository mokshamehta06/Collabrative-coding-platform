import dns from "node:dns"
import { Resolver } from "node:dns/promises"

const resolver = new Resolver()
resolver.setServers(["8.8.8.8", "8.8.4.4"])
dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8", "8.8.4.4"])

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import { YSocketIO } from "y-socket.io/dist/server"
import { timeStamp } from "console"
import connectDb from "./config/database.js"
import { error } from "node:console"
import errorHandler from "./middleware/errorHandler.js"
import authRoute from './routes/authRoute.js'

dotenv.config()
const app = express()
app.use(express.static("public"))

const corsOptions = {
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoute)
app.get('/health', (req, res) => {
    res.status(200).json({
        message: "ok",
        success: true,
        timeStamp:new Date().toISOString(),
    })
})
connectDb()

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ]
    }
})
const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()

app.use(errorHandler)

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000")
})