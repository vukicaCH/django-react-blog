import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser'

import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import EditPost from '../containers/EditPost'
import CommentForm from '../components/CommentForm'
import DeleteButton from '../components/Delete'
import NotFound from '../containers/NotFound'

const Post = ({match, isSuperuser, username}) => {
	
	const [...id] = match.params.id
	
	const history = useHistory()
	
	const IDE = id.join('')
	
	const [post, setPost] = useState('')
	const [comments, setComments] = useState([])
	
	useEffect(() => {
	
		const getPost = async () => {
			await axios.get(`http://127.0.0.1:8000/api/posts/${IDE}`)
						.then(res => {setPost(res.data)})
		}
		
		const getComments = async () => {
			await axios.get(`http://127.0.0.1:8000/api/posts/${IDE}/comments`)
						.then(res => {setComments(res.data)})
		}
		
		getPost();
		getComments();
	}, [])
	
	
	let renderedComments = ''
	
	if(comments.length > 0){
		 renderedComments =  comments.map(comment => {
			return(
			<div className="card my-4" key={comment.id}>
			  <div className="card-body">
				<p className="text-left"><i><b>{comment.author}</b> commented:</i></p>
				<p className='card-header ml-10 text-left'>{comment.text}</p>
			  </div>
			  {username === comment.author ? <DeleteButton id={comment.id} IDE={IDE} /> : ''}
			</div>
			
			)
		})
	}else{
		renderedComments =  (
			<div className="media mb-4">
			  <h1>NO COMMENTS YET</h1>
			</div>
		)
	}
	
	if(!post){
		return (
			<NotFound />
		)
	}
	
	return(
	<div className='post'>
	<div className="container">

		<div className="row">

			<div className="col-lg-8">

			<h1 className="mt-4 text-left">{post.title}</h1>



			<p className='text-left'><i>created at {post.date_created.slice(0,10)} by <b>{post.author}</b></i></p>
			{isSuperuser ? 
			<>
			<Link to={`/${post.id}/edit-post/`} >Edit post  </Link>
			<Link to={`/${post.id}/delete-post/`}>Delete post</Link>
			</> 
			:
			''
			}


			<img className="img-fluid rounded" src={post.thumbnail} alt="" />

        
			<p>{ReactHtmlParser(post.content)}</p>
			<h2 className='text-align'>Comments:</h2>
			<CommentForm id={post.id} />
			{renderedComments}
		 </div>
        </div>
      </div>
      </div>

	)
	
}

const matchStateToProps = state => ({
	
	isSuperuser: state.auth.isSuperuser,
	username: state.auth.username

})

export default connect(matchStateToProps)(Post);
