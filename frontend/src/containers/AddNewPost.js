import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import {connect} from 'react-redux'

import NotFound from './NotFound'

import CKEditor, { getData, setData } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const AddNewPost = ({isSuperuser, username}) => {
	
	const history = useHistory()
	
	const [title,setTitle] = useState('')
	const [content, setContent] = useState('')
	const [overviews, setOverviews] = useState('')
	const [thumbnail, setThumbnail] = useState('')
	
	
	const onTitleChange = e => setTitle(e.target.value)
	
	const onContentChange = (event,editor) => {
		const data = editor.getData()
		setContent(data)
	}
	
	const onOverviewChange = e => setOverviews(e.target.value) 
	const onThumbChange = e => setThumbnail(e.target.files[0])
	
	
	const onSubmit = async(e) => {
		e.preventDefault();
		
		const config = { 
			headers: {
			'Content-Type': 'multipart/form-data'
			}
		}
		
		let form = new FormData();
		form.append('author', username)
		form.append('title',title)
		form.append('content', content)
		form.append('overviews', overviews)
		form.append('thumbnail', thumbnail)
		
		try{
			await axios.post('http://127.0.0.1:8000/api/posts/add-post/', form, config)
							.then(res => {history.push(`/${res.data.new_post}`); console.log(res.data.new_post)})
							.catch(err => console.log(err))
		}catch(err){
			console.log(err)
		}
		
	}
	
	if (!isSuperuser){
			return (
			<NotFound />
			)}
	
	return(
		<div className='row mt-3 ml-20'>
		<div className='col-lg-3'>
		</div>
		<div className='col-lg'>
		<div classNameName="container">
			<div className="row centered-form">
					<div className="panel panel-default">
						<div className="panel-heading">
			    		<h3 className="panel-title">Add new post</h3>
			 			</div>
			 			<div className="panel-body">
			    		<form role="form" onSubmit={onSubmit}>
			    			<div className="form-group">
			    				<input type="text" name="title" value={title} onChange={onTitleChange}  className="form-control input-sm" placeholder="title" />
			    			</div>

			    			<div className="form-group">
									<CKEditor 
										editor={ClassicEditor}
										data={content}
										onInit={editor => console.log('editor is ready')}
										onChange={onContentChange}
									/>
			    			</div>
			    			
			    			<div className="form-group">
			    				<textarea name="overviews" value={overviews} onChange={onOverviewChange} className="form-control input-sm" placeholder="overview" />
			    			</div>

			    			<div className="form-group">
			    				<input type='file' onChange={onThumbChange} accept="image/png, image/jpeg" className="form-control input-sm" placeholder="thumbnail" />
			    			</div>
			    			
			    			<input type="submit" value="Add Post" className="btn btn-info btn-block" />
			    		
			    		</form>
	    		</div>
    		</div>
    	</div>
    </div>
	</div>
    </div>
	)
}

const matchStateToProps = state => ({
	username: state.auth.username,
	isSuperuser: state.auth.isSuperuser
})

export default connect(matchStateToProps)(AddNewPost);
