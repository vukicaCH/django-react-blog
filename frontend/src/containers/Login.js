import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { Login } from '../actions/auth'



const LogIn = ({Login}) => {
	
	const history = useHistory()
	
	const [formData, setFormData] = useState({username: '', password: ''})
	
	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
	
	const {username, password} = formData;
	
	const onSubmit = e => {
		e.preventDefault()
		
		Login({username, password})
		history.push('/')
	}
	
	return(
		<div className='row mt-3 ml-5'>
		<div className='col-sm-4'>
		</div>
		<div className='col-sm-8'>
		<div className="container">
			<div className="row centered-form">
				<div className="col-xs-12 col-sm-8 col-md-4 col-sm-offset-2 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-heading">
			    		<h3 className="panel-title">Log in to your account</h3>
			 			</div>
			 			<div className="panel-body">
			    		<form role="form" onSubmit={onSubmit}>
			    			<div className="form-group">
			    				<input type="text" name="username" onChange={onChange} value={username} className="form-control input-sm" placeholder="Username" />
			    			</div>
			    			
			    			<div className="form-group">
			    				<input type="password" name="password" onChange={onChange} value={password} className="form-control input-sm" placeholder="Password" />
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

export default connect(null, {Login})(LogIn);
