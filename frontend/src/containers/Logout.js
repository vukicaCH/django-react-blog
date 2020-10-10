import React from 'react';
import {logout} from '../actions/auth';

import {useHistory} from 'react-router-dom'

import {connect} from 'react-redux'

import NotFound from './NotFound';

const Logout = ({logout, isAuthenticated}) => {
	
	const history = useHistory()
	
	const onConfirm = () => {
		logout();
		history.push('/')
		
	}
	
	const onGoBack = () => {
		history.push('/')
	}
	
	if(!isAuthenticated){
		return(
			<NotFound />
		)
	}
	
	return(
		<div className='row'>
		<div className='col-lg-4'></div>
		<div className="col-lg-3 col-md-6 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h4 className="card-title">Are you sure you want to logout?</h4>
          </div>
          <div className="card-footer">
            <button className="btn btn-secondary mr-3" onClick={onConfirm}>Confirm</button>
            <button className="btn btn-primary" onClick={onGoBack}>Go back</button>
          </div>
        </div>
      </div>
      </div>
	)
}

const matchStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(matchStateToProps, {logout})(Logout);
