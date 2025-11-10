import { getCollectionItems } from "@/firebaseDB"
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { generateTokens } from '@/utils/lib/generateTokens'
import { Request, Response } from "express"
import { IUser } from "@/types/user"
import { RouteMessage } from "@/utils/consts/routeMessage"

dotenv.config()

interface AuthWithJWTRequest {
	login: string,
	password: string
}

interface AuthWithJWTResponse {
	message?: RouteMessage,
	accessToken?: string,
	refreshToken?: string,
	user?: Omit<IUser, 'password'>
}

export const authWithJWT = async (req: Request<{}, {}, AuthWithJWTRequest>, res: Response<AuthWithJWTResponse>) => {
	try {
		const { login, password } = req.body
		
		const users = await getCollectionItems("users") as IUser[]
		const findedUser = users.find(user => user.login === login || user.email === login)

		if (!findedUser) {
			return res.status(404).json({ message: RouteMessage.AUTH_ERROR })
		}

		const validPassword = await bcrypt.compare(password, findedUser.password ?? '')
		if (!validPassword) {
			return res.status(400).json({ message: RouteMessage.AUTH_ERROR })
		}

		const { accessToken, refreshToken } = generateTokens(findedUser)

		delete findedUser.password 

		res.json({
			message: RouteMessage.AUTH_SUCCESS,
			accessToken,
			refreshToken,
			user: findedUser
		})
	} catch (error) {
		res.status(500).json({ message: RouteMessage.SERVER_ERROR })
	}
}
