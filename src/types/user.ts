import { IGeneral } from "./general"
import { UserRoleType } from "./roles"

export interface IUser extends IGeneral {
	name: string,
	surname: string,
	avatar?: string,
	login?: string,
	email: string,
	password?: string,
	roles: UserRoleType[]
}

export interface IUserProfile {
	userId: IGeneral['id'],
	boardIds: IGeneral['id'],
	boardCount: number,
	totalIssuePointsCount: number
}