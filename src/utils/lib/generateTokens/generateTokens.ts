import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IUser } from "@/types/user"

dotenv.config()

export const generateTokens = (user: IUser) => {
	const accessToken = jwt.sign(
		{ userId: user.id, email: user.email },
		process.env.JWT_ACCESS_SECRET ?? '',
		{ expiresIn: '15m' }
	)

	const refreshToken = jwt.sign(
		{ userId: user.id },
		process.env.JWT_REFRESH_SECRET ?? '',
		{ expiresIn: '365d' }
	)

	return { accessToken, refreshToken }
}
