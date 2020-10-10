import React,{useState, useEffect} from 'react';

import {useHistory} from 'react-router-dom'

import axios from 'axios';
import { connect } from 'react-redux'

import NotFound from './NotFound'
import CKEditor, { getData, setData } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditPost = ({match, isSuperuser}) => {
	
	const [...id] = match.params.id
	
	const ID = id.join('')
	
	const history = useHistory()
	
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [overviews, setOverviews] = useState('')
	const [thumbnail, setThumbnail] = useState('')
	
	
	useEffect(() =>{
		
		const getPost = async () => {
			await axios.get(`http://127.0.0.1:8000/api/posts/${ID}/`)
			.then(res => {
				setTitle(res.data.title)
				setContent(res.data.content)
				setOverviews(res.data.overviews)
				})
		}
		
		getPost();
		
		},[])
		
	if(!isSuperuser){
		return (
			<NotFound />
		)
	}
		
	const onTitleChange = e => setTitle(e.target.value)
	const onContentChange = (event, editor) => {
		const data = editor.getData()
		setContent(data)
	}
	const onOverviewChange = e => setOverviews(e.target.value)
	const onThumbChange = e => setThumbnail(e.target.files[0])
	
	const onSubmit = async (e) => {
		e.preventDefault()
		
		const config = {
			headers: {
				'Content-type':'multipart/form-data'
			}
		}
		
		let form = new FormData()
		form.append('title',title)
		form.append('content',content)
		form.append('overviews', overviews)
		form.append('thumbnail', thumbnail)
		
		await axios.put(`http://127.0.0.1:8000/api/posts/${ID}/edit-post/`, form, config)
					.then(res => console.log(res))
					.catch(err => console.log(err))
					
		history.push(`/${ID}`)
	}
		
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
			    				<input type="text" name="title" value={title}  onChange={onTitleChange} className="form-control input-sm" placeholder="title" />
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
			    				<input type='file'  accept="image/png, image/jpeg" onChange={onThumbChange} className="form-control input-sm" placeholder="thumbnail" />
			    			</div>
			    			
			    			<input type="submit" value="Edit Post" className="btn btn-info btn-block" />
			    		
			    		</form>
	    		</div>
    		</div>
    	</div>
    </div>
	</div>
    </div>
	)
	
}

const matchStateToProps = state =>({
	
	isSuperuser: state.auth.isSuperuser
	
})

export default connect(matchStateToProps)(EditPost);
