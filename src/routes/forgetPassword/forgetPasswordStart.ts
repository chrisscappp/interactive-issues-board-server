import { getCollectionItems } from "@/firebaseDB"
import { Request, Response } from "express"
import { IUser } from "@/types/user"
import { RouteMessage } from "@/utils/consts/routeMessage"
import { generateUniqueId } from "@/utils/lib/generateUniqueId"
import { nodemailerTransporter } from "@/nodemailer"
import dotenv from "dotenv"

dotenv.config()

interface ForgetPasswordStartRequestBody {
	email: string,
	comment?: string,
	link: string
}

interface ForgetPasswordStartResponse {
	message?: RouteMessage,
	email?: string,
	token?: string
}

export const forgetPasswordStart = async (req: Request<{}, {}, ForgetPasswordStartRequestBody>, res: Response<ForgetPasswordStartResponse>) => {
	try {
		const { email, link, comment } = req.body
		
		const users = await getCollectionItems("users") as IUser[]
		const findedUser = users.find(user => user.email === email)

		if (!findedUser) {
			return res.status(404).json({ message: RouteMessage.USER_NOT_FOUND })
		}

		const token = generateUniqueId()

		const sendedMessage = await nodemailerTransporter.sendMail({
			from: process.env.NODEMAILER_AUTH_USER,
			to: email,
			subject: "Смена пароля",
			html: `
				<h1>Смена пароля</h1>
				<p>Для смены пароля перейдите по ссылке ${link}&token=${token}&email=${email}</p>
				<p>Если это не вы, проигнорируйте сообщение и напишите в службу поддержки!</p>
			`
		})

		if (!sendedMessage.messageId) {
			return res.status(400).json({ message: RouteMessage.MESSAGE_CREATE_ERROR })
		}

		res.json({
			message: RouteMessage.FORGET_PASSWORD_START,
			token,
			email
		})
	} catch (error) {
		res.status(500).json({ message: RouteMessage.SERVER_ERROR })
	}
}
