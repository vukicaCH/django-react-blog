import React from 'react';
import {useHistory} from 'react-router-dom';

import axios from 'axios'
import NotFound from './NotFound'
import {connect} from 'react-redux'

const DeletePost = ({match, isSuperuser}) => {
	
	const [...id] = match.params.id
	
	const ID = id.join('')
	
	const history = useHistory()
	
	const onClick = async (e) => {
		e.preventDefault()
		
		await axios.delete(`http://127.0.0.1:8000/api/posts/${ID}/delete-post/`)
		
		history.push(`/`)
	}

	if(!isSuperuser){
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
            <h4 className="card-title">Are you sure you want to delete this post?</h4>
          </div>
          <div className="card-footer">
            <button onClick={onClick} className="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
      </div>
	)
}

const matchStateToProps = state => ({
	
	isSuperuser: state.auth.isSuperuser

})

export default connect(matchStateToProps)(DeletePost);
