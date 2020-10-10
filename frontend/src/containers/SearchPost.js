import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


const SearchPost = ({match}) => {
	
	const [...letters] = match.params.keyword
	
	const keyword = letters.join('')
	
	const [keywords, setKeywords] = useState('')
	const [results, setResults] = useState([])
	
	
	useEffect(() => {
		
		const search = async () => {
			
			await axios.get(`http://127.0.0.1:8000/api/posts/search-post/${keyword}`)
					.then(res => {setResults(res.data)})
		}
		
		search()
		
		},[keyword])
		
	let renderedResults;
		
	if(results.length > 0){
		renderedResults = results.map(result => {
			return(
				<div className="col-lg-3 col-md-6 mb-4" key={result.id}>
					<div className="card h-100">
					  <img className="card-img-top" src={result.thumbnail} width = '250' height = '280' alt="" />
					  <div className="card-body">
						<h4 className="card-title">{result.title}</h4>
						<p className="card-text">{result.overviews}</p>
					  </div>
					  <div className="card-footer">
						<Link to={`/${result.id}`} className="btn btn-primary">View post</Link>
					  </div>
					</div>
				</div>
			)
			})
	}else{
		renderedResults = (<h1>NO RESULTS FOR THAT KEYWORD.TRY ANOTHER ONE</h1>)
	}
	
	return (
		<div className='container' style={{ marginTop: '20px' }}>
			<div className='row'>
				{renderedResults}
			</div>
		</div>
	)
}

export default SearchPost;
