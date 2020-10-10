import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux'

const CommentForm = ({id, username, isAuthenticated}) => {
	
	const history = useHistory()
	
	const [text, setText] = useState('')
	
	const onChange = e => setText(e.target.value)
	
	const submitComment = async () => {
		const config = {
			headers: {
				'Content-type':'application/json'
			}
		}
		
		const body = JSON.stringify({author: username, text: text})
		
		await axios.post(`http://127.0.0.1:8000/api/posts/${id}/add-comment/`, body, config)
						.then(res => console.log(res.data))
						.catch(err => console.log(err))
		
	}
	
	const onSubmit = e => {
		e.preventDefault();
		submitComment()
		history.push(`/`)
	}
	
	let textField;
	
	if(isAuthenticated){
		textField = (
		<>
			<div className="form-group">
				<textarea className="form-control" value={text} onChange={onChange} rows="3" ></textarea>
			</div>
			<button type="submit"  className="btn btn-primary">Submit</button>
		</>
		)
	}else{
		textField = (
		<>
			<div className="form-group">
                <textarea className="form-control" 
							value={text} 
							onChange={onChange} 
							rows="3" 
							placeholder='You need to be logged in to add a comment' 
							disabled></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled>Submit</button>
        </>
            )
	}
	
	return(
		<div className="card my-4">
          <h5 className="card-header">Leave a Comment:</h5>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              {textField}
            </form>
          </div>
        </div>
	)
}

const matchStateToProps = state => ({
		
	username: state.auth.username,
	isAuthenticated: state.auth.isAuthenticated
		
})

export default connect(matchStateToProps)(CommentForm);
