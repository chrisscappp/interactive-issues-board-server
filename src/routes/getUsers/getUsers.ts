import { Request, Response } from "express"
import { RouteMessage } from "@/utils/consts/routeMessage"
import { IUser, UserWithoutPasswordType } from "@/types/user"
import { getCollectionItem, getCollectionItems } from "@/firebaseDB"

interface GetUserByIdRequestParams {
	userId?: string
}

interface GetUserByIdResponse {
	message?: RouteMessage,
	user?: UserWithoutPasswordType,
	users?: UserWithoutPasswordType[]
}

export const getUsers = async (req: Request<GetUserByIdRequestParams>, res: Response<GetUserByIdResponse>) => {
	try {
		const { userId } = req.params
		
		if (userId) {
			const user = await getCollectionItem("users", userId) as IUser

			if (!user) {
				return res.status(404).json({ message: RouteMessage.USER_NOT_FOUND })
			}

			delete user.password

			res.json({
				message: RouteMessage.GET_USER,
				user
			})
		} else {
			const users = await getCollectionItems('users') as IUser[]

			if (!users) {
				return res.status(404).json({ message: RouteMessage.USERS_NOT_FOUND })
			}

			const usersWithoutPassword: UserWithoutPasswordType[] = users.map(user => {
				delete user.password
				return user
			})

			res.json({
				message: RouteMessage.GET_USERS,
				users: usersWithoutPassword
			})
		}
	} catch (error) {
		res.status(500).json({ message: RouteMessage.SERVER_ERROR })
	}
}
