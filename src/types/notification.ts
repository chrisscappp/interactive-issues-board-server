import { IGeneral } from "./general"

export type NotificationType = 
'system' |
'addUserToBoard' | 
'addUserToIssue' | 
'removeUserFromIssue' |
'createBoard' |
'createColumn' |
'createIssue' |
'completeIssue' | 
'moveIssue' | 
'deleteBoard' |
'deleteColumn' |
'deleteIssue'

export interface INotification extends IGeneral {
	userId?: IGeneral['id'],
	issueId?: IGeneral['id'],
	creatorId?: IGeneral['id'],
	type: NotificationType,
	metadata: 
		INotificationSystemMetadata | 
		INotificationAddUserToBoardMetadata |
		INotificationAddUserToIssueMetadata |
		INotificationRemoveUserFromIssueMetadata |
		INotificationCreateBoardMetadata |
		INotificationCreateColumnMetadata |
		INotificationCreateIssueMetadata |
		INotificationCompleteIssueMetadata |
		INotificationMoveIssueMetadata |
		INotificationDeleteBoardMetadata |
		INotificationDeleteColumnMetadata |
		INotificationDeleteIssueMetadata
}

export interface INotificationSystemMetadata {
	text: string
}

export interface INotificationAddUserToBoardMetadata {
	boardName: string,
	userName: string,
	ownerName: string
}

export interface INotificationAddUserToIssueMetadata {
	issueName: string,
	userName: string,
	ownerName: string
}

export interface INotificationRemoveUserFromIssueMetadata {
	issueName: string,
	userName: string,
	ownerName: string
}

export interface INotificationCreateBoardMetadata {
	boardName: string,
	ownerName: string
}

export interface INotificationCreateColumnMetadata {
	boardName: string,
	columnName: string,
	ownerName: string
}

export interface INotificationCreateIssueMetadata {
	boardName: string,
	columnName: string,
	issueName: string,
	ownerName: string
}

export interface INotificationCompleteIssueMetadata {
	boardName: string,
	columnName: string,
	issueName: string,
	userName: string
}

export interface INotificationMoveIssueMetadata {
	boardName: string,
	columnNameTo: string,
	columnNameFrom: string,
	issueName: string,
	userName: string
}

export interface INotificationDeleteBoardMetadata {
	boardName: string,
	ownerName: string
}

export interface INotificationDeleteColumnMetadata {
	boardName: string,
	columnName: string,
	ownerName: string
}

export interface INotificationDeleteIssueMetadata {
	boardName: string,
	columnName: string,
	issueName: string,
	ownerName: string
}