import React from 'react';
import axios from 'axios';

import {Link, useHistory} from 'react-router-dom'

const DeleteButton = ({id, IDE}) => {
	
	const history = useHistory()
	
	const onClick = async() => {
		
		await axios.delete(`http://127.0.0.1:8000/api/posts/comments/${id}`)
		
	}
	
	return(
		<Link onClick={onClick} to='/'>Delete</Link>
	)
}

export default DeleteButton
