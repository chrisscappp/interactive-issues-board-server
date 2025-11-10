import { IUser } from "@/types/user"

export const isUser = (user: IUser | any): user is IUser => {
	return Boolean(user.id)
}