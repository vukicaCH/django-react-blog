import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import NoPosts from './NoPosts'


const Home = () => {
	
	const [lastPost, setLastPost] = useState([])
	const [otherPosts, setOtherPosts] = useState([])
	
	useEffect(() => {
		
		const getPosts = async() =>{
			await axios.get('http://127.0.0.1:8000/api/posts/')
							.then(res => {
									const [latestPost, ...posts] = res.data;
									setLastPost(latestPost);
									setOtherPosts(posts);
								})
		}
		
		getPosts()
		
		}, [])
		
		if(lastPost){
		}else{
			return(
				<NoPosts />
			)
		}
		
		if(!otherPosts){
			return(
				<NoPosts />
			)
		}
	
	const renderedPosts = otherPosts.map(post => {
		
			
			return(
				<div className="col-lg-3 col-md-6 mb-4" key={post.id}>
					<div className="card h-100">
					  <img className="card-img-top" src={post.thumbnail} width = '250' height = '280' alt="" />
					  <div className="card-body">
						<h4 className="card-title">{post.title}</h4>
						<p className="card-text">{post.overviews.slice(0,100) + '...'}</p>
					  </div>
					  <div className="card-footer">
						<Link to={`/${post.id}`} className="btn btn-primary">View post</Link>
					  </div>
					</div>
				</div>
			)
			
	})
	
	return(
		<div className='home'>
		<div className='container'>
			<div className="jumbotron" style={{
										backgroundImage: "url(" + `${lastPost.thumbnail }` + ")",
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										}}>
				<div className='container last'>
				  <h1 className="display-4 lead">{lastPost.title}</h1>
				  <p className="lead">{lastPost.overviews}</p>
				  <p className="lead-button">
					<Link className="btn btn-primary btn-lg" to={`/${lastPost.id}`} role="button">View post</Link>
				  </p>
				</div>
			</div>
			<div className='row'>
				{renderedPosts}
			</div>
		</div>
		</div>
	)
}

export default Home;

