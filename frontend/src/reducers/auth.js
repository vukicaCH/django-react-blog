import { SIGNUP_SUCCESS, SIGNUP_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from '../actions/types'

const initialState = {
	isAuthenticated: null,
	username: null,
	isSuperuser: null,
}

export default function(state = initialState, action){
	const {type, payload} = action;
	
	switch(type){
		case SIGNUP_SUCCESS:
			return {...state, isAuthenticated: false}
		case LOGIN_SUCCESS:
			return {...state, isAuthenticated: true, username: payload.username, isSuperuser: payload.is_superuser}
		case SIGNUP_FAILED:
		case LOGIN_FAILED:
		case LOGOUT:
			return {...state, isAuthenticated: null, username: null, isSuperuser: null}
		default:
			return state
	}
}
