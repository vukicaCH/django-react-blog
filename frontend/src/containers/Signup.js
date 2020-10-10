import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import { SignUp } from '../actions/auth';
import { connect } from 'react-redux';

const Signup = ({SignUp}) => {
	
	let history = useHistory()
	
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
	const usChange = e => setUsername(e.target.value)
	const emailChange = e => setEmail(e.target.value)
	const passChange = e => setPassword(e.target.value)
	
	const onSubmit = e => {
		e.preventDefault()
		SignUp({username, email, password})
		history.push('/login')
	}
	
	
	return(
		<div className='row mt-3 ml-5'>
		<div className='col-sm-4'>
		</div>
		<div className='col-sm-8'>
		<div classNameName="container">
			<div className="row centered-form">
				<div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-heading">
			    		<h3 className="panel-title">Create new account</h3>
			 			</div>
			 			<div className="panel-body">
			    		<form role="form" onSubmit={onSubmit}>
			    			<div className="form-group">
			    				<input type="text" name="username" onChange={usChange} value={username} className="form-control input-sm" placeholder="Username" />
			    			</div>

			    			<div className="form-group">
			    				<input type="email" name="email" onChange={emailChange} value={email} className="form-control input-sm" placeholder="Email Address" />
			    			</div>


			    			<div className="form-group">
			    						<input type="password" name="password" onChange={passChange} value={password} className="form-control input-sm" placeholder="Password" />
			    			</div>
			    			
			    			<input type="submit" value="Register" className="btn btn-info btn-block" />
			    		
			    		</form>
			    	</div>
	    		</div>
    		</div>
    	</div>
    </div>
	</div>
    </div>
	)
}


export default connect(null, {SignUp})(Signup)
