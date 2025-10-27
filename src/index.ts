import express, { Express } from "express"
import dotenv from "dotenv"

dotenv.config()

const app: Express = express()
const port = 8085

app.listen(port, () => { console.log(`Server is running in PORT = ${port}`) })
