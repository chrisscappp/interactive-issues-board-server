export const enum RouteMessage {
	// JWT
	TOKEN_ERROR='token_error',
	INVALID_TOKEN_STRUCTURE='invalid_token_structure',
	INVALID_TOKEN='invalid_token',
	AUTH_ERROR='auth_error',
	AUTH_SUCCESS='auth_success',
	SERVER_ERROR='server_error',
	EXISTING_USER='existing_user',
	USER_CREATED='user_created',
	REFRESH_TOKEN_REQUIRED='refresh_token_required',
	INVALID_REFRESH_TOKEN='invalid_refresh_token',

	// USER
	GET_USER='get_user',
	GET_USERS='get_users',
	USER_NOT_FOUND='user_not_found',
	USERS_NOT_FOUND='users_not_found',

	// NODEMAILER
	MESSAGE_CREATE_ERROR='message_create_error',
	MESSAGE_CREATE_SUCCESS='message_create_success',

	// FORGET PASSWORD
	FORGET_PASSWORD_START='forget_password_start',
	FORGET_PASSWORD_CHANGE='forget_password_change'
}