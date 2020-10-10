
import axios from 'axios'
import {LOGIN_FAILED, LOGIN_SUCCESS, SIGNUP_FAILED, SIGNUP_SUCCESS, LOGOUT} from './types'

export const SignUp = ({username, email, password}) => async dispatch =>  {
	
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	
	
	const body = JSON.stringify({username, email, password})
	
	try {
		await axios.post('http://127.0.0.1:8000/api/accounts/register/', body, config)
						.then(res => {
								dispatch({
								type: SIGNUP_SUCCESS,
								})
							})
						.catch(err => {
								console.log(err)
								dispatch({type: SIGNUP_FAILED,})	
									})
	}catch(err){
		console.log(err)
	}
}

export const Login = ({username, password}) => async dispatch => {
	
	const config = {
		headers: {
			'Content-type':'application/json'
		}
	}
	
	
	const body = JSON.stringify({username ,password})
	
	try{
		await axios.post('http://127.0.0.1:8000/api/accounts/login/', body, config)
						.then(res => dispatch({
										type: LOGIN_SUCCESS,
										payload: res.data
						})).catch(err =>{
								console.log(err)
								dispatch({ type: LOGIN_FAILED })
							})
		
	}
	catch(err){console.log(err)}
}

export const logout = () => async dispatch => {
	
	dispatch({type: LOGOUT})
}
