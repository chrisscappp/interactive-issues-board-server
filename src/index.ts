import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { authWithJWT } from "@/routes/authWithJWT"
import { registerWithJWT } from "@/routes/registerWithJWT"
import { refreshJWT } from "@/routes/refreshJWT"
import { RouteName } from "@/utils/consts/routes"

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT || 8085

// JWT
app.route(RouteName.LOGIN).post(authWithJWT)
app.route(RouteName.REGISTER).post(registerWithJWT)
app.route(RouteName.REFRESH_TOKEN).post(refreshJWT)

app.listen(port, () => { console.log(`Server is running in PORT = ${port}`) })
