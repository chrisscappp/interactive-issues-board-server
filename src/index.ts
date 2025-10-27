import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT || 8085

app.listen(port, () => { console.log(`Server is running in PORT = ${port}`) })
