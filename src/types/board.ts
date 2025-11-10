import { IGeneral } from "./general"
// use

export interface IBoard extends IGeneral {
	ownerId: IGeneral['id'],
	participantsIds: Array<IGeneral['id']>,
	name: string,
	description: string,
	columnsIds: Array<IGeneral['id']>
}

export interface IBoardColumn extends IGeneral {
	name: string,
	description: string,
	issueIds: Array<IGeneral['id']>
}

export interface IBoardIssue extends IGeneral {
	boardId: IGeneral['id'],
	columnId: IGeneral['id'],
	participantsIds: Array<IGeneral['id']>,
	issuePoint: number,
	deadline: Date,
	isDone: boolean,
	notificationsIds: Array<IGeneral['id']>
}