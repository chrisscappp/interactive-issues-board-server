import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response } from "express"
import { RouteMessage } from "@/utils/consts/routeMessage"
import { isUser } from "@/utils/typeguards/isUser"

dotenv.config()

interface RefreshJWTRequestBody {
	refreshToken: string
}

interface RefreshJWTResponse {
	message?: RouteMessage,
	accessToken?: string
}

export const refreshJWT = async (req: Request<{}, {}, RefreshJWTRequestBody>, res: Response<RefreshJWTResponse>) => {
	let refreshToken = req.body.refreshToken

	// Удаляем кавычки если они есть
	if (refreshToken.startsWith('"') || refreshToken.startsWith("'")) {
		refreshToken = refreshToken.slice(1, -1)
	}

	if (!refreshToken) {
		return res.status(401).json({ message: RouteMessage.REFRESH_TOKEN_REQUIRED })
	}

	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET ?? '', (err, user) => {
		if (err) {
			return res.status(403).json({ message: RouteMessage.INVALID_REFRESH_TOKEN })
		}

		if (isUser(user)) {
			const newAccessToken = jwt.sign(
				{ userId: user.id, email: user.email },
				process.env.JWT_ACCESS_SECRET ?? '',
				{ expiresIn: '15m' }
			)

			res.json({
				message: RouteMessage.AUTH_SUCCESS,
				accessToken: newAccessToken
			})	
		}
	})
}
