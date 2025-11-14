import express, { Express } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { authWithJWT } from "@/routes/authWithJWT"
import { registerWithJWT } from "@/routes/registerWithJWT"
import { refreshJWT } from "@/routes/refreshJWT"
import { RouteName } from "@/utils/consts/routes"
import { getUsers } from "@/routes/getUsers"

dotenv.config()

const app: Express = express()
const port = process.env.SERVER_PORT || 8085

app.use(cors({
	origin: "*"
})) // временная мера

app.use(express.json())

// JWT
app.route(RouteName.LOGIN).post(authWithJWT)
app.route(RouteName.REGISTER).post(registerWithJWT)
app.route(RouteName.REFRESH_TOKEN).post(refreshJWT)

// USER
app.route(`${RouteName.GET_USERS}/:userId`).get(getUsers)

app.listen(port, () => { console.log(`Server is running in PORT = ${port}`) })
