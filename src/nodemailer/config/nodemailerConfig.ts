import { createTransport } from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()

export const nodemailerTransporter = createTransport({
	host: "smtp.mail.ru",
	port: 465,
	secure: true,
	auth: {
		user: process.env.NODEMAILER_AUTH_USER,
		pass: process.env.NODEMAILER_AUTH_PASSWORD
	}
})