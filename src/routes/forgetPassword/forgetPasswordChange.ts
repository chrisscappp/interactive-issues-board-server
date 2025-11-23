import { getCollectionItems, updateCollectionItem } from "@/firebaseDB"
import { Request, Response } from "express"
import { IUser } from "@/types/user"
import { RouteMessage } from "@/utils/consts/routeMessage"
import bcrypt from 'bcryptjs'
import { nodemailerTransporter } from "@/nodemailer"
import dotenv from "dotenv"

dotenv.config()

interface ForgetPasswordChangeRequestBody {
	email: string,
	password: string
}

interface ForgetPasswordChangeResponse {
	message?: RouteMessage,
	email?: string
}

export const forgetPasswordChange = async (req: Request<{}, {}, ForgetPasswordChangeRequestBody>, res: Response<ForgetPasswordChangeResponse>) => {
	try {
		const { email, password } = req.body
		
		const users = await getCollectionItems("users") as IUser[]
		const findedUser = users.find(user => user.email === email)

		if (!findedUser) {
			return res.status(404).json({ message: RouteMessage.USER_NOT_FOUND })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await updateCollectionItem('users', String(findedUser.id), {
			...findedUser,
			password: hashedPassword
		})

		res.json({
			message: RouteMessage.FORGET_PASSWORD_CHANGE,
			email
		})
	} catch (error) {
		res.status(500).json({ message: RouteMessage.SERVER_ERROR })
	}
}
