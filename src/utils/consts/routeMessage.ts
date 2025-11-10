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
	INVALID_REFRESH_TOKEN='invalid_refresh_token'
}