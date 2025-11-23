import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from "express"
import { RouteMessage } from "@/utils/consts/routeMessage"

dotenv.config()

interface AuthenticateTokenResponse {
	message?: RouteMessage
}

export const authenticateToken = (req: Request extends Record<string, any> ? Request : object, res: Response<AuthenticateTokenResponse>, next: NextFunction) => {
	const authHeader = req.headers['authorization']
	let token = authHeader && authHeader.split(' ')[1]

	// Удаляем кавычки если они есть
	if (token && (token.startsWith('"') || token.startsWith("'"))) {
		token = token.slice(1, -1)
	}

	if (!token) {
		return res.status(401).json({ message: RouteMessage.TOKEN_ERROR })
	}

	const tokenParts = token.split('.');
	if (tokenParts.length !== 3) {
		return res.status(403).json({ message: RouteMessage.INVALID_TOKEN_STRUCTURE })
	}

	jwt.verify(token, process.env.JWT_SECRET ?? '', (err, user) => {
		if (err) {
			return res.status(403).json({ message: RouteMessage.INVALID_TOKEN })
		}

		req.user = user
		next()
	})
}
