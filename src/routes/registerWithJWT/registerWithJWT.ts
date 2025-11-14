import { getCollectionItems, addItemToCollection } from '@/firebaseDB'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { Request, Response } from "express"
import { generateTokens } from '@/utils/lib/generateTokens'
import { IUser, UserWithoutPasswordType } from "@/types/user"
import { RouteMessage } from "@/utils/consts/routeMessage"
import { generateUniqueId } from "@/utils/lib/generateUniqueId"

dotenv.config()

interface RegisterWithJWTRequestBody {
	name: string,
	surname: string,
	password: string,
	email: string,
	login?: string
}

interface RegisterWithJWTResponse {
	message?: RouteMessage,
	accessToken?: string,
	refreshToken?: string,
	user?: UserWithoutPasswordType
}

export const registerWithJWT = async (req: Request<{}, {}, RegisterWithJWTRequestBody>, res: Response<RegisterWithJWTResponse>) => {
	try {
		const {
			email,
			name,
			password,
			surname,
			login
		} = req.body		

		const users = await getCollectionItems('users') as IUser[]
		const existingUser = users.find(user => user.email === email || user.login === login)

		if (existingUser) {
			return res.status(400).json({ message: RouteMessage.EXISTING_USER })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUserId = generateUniqueId()
		const newUser: IUser = {
			id: newUserId,
			password: hashedPassword,
			roles: ["user"],
			createdAt: new Date(),
			updatedAt: new Date(),
			email,
			name,
			surname,
			login
		}

		await addItemToCollection('users', newUserId, newUser)

		const { accessToken, refreshToken } = generateTokens(newUser)

		delete newUser.password

		res.status(201).json({
			message: RouteMessage.USER_CREATED,
			accessToken,
			refreshToken,
			user: newUser
		})
	} catch (error) {
		res.status(500).json({ message: RouteMessage.SERVER_ERROR })
	}
}
