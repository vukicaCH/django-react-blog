import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'


const Navbar = ({isAuthenticated, isSuperuser}) => {
	
	const history = useHistory()
	
	const authLinks = (
		<li className="nav-item active">
			<Link className="nav-link" to="/logout">Logout</Link>
		</li>
	)
	
	const guestLinks = (
		<React.Fragment>
			<li className="nav-item active">
					<Link className="nav-link" to="/signup">Sign up</Link>
				</li>
			<li className="nav-item active">
				<Link className="nav-link" to="/login">Log in</Link>
			</li>
		</React.Fragment>
	)
	
	const addNewPostLink = (
		<li className="nav-item active">
			<Link className="nav-link" to="/add-new-post">Add new post</Link>
		</li>
	)
	
	const [search, setSearch] = useState('')
	
	const onChange = e => setSearch(e.target.value)
	
	const onSubmit = e => { 
		e.preventDefault()
		
		history.push(`/search/${search}/`)
		}
	
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <Link className="navbar-brand" to='/'>Your Blog</Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
					  <li className="nav-item active">
						<Link className="nav-link" to='/'>Home <span className="sr-only">(current)</span></Link>
					  </li>
					  {isAuthenticated ? authLinks : guestLinks}
					  {isSuperuser ? addNewPostLink : null}
					</ul>
					<form className="form-inline my-2 my-lg-0" onSubmit={onSubmit}>
						  <input className="form-control mr-sm-2" type="search" value={search} onChange={onChange} placeholder="Search" />
						  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
			  </div>
		</nav>
	)
	
	
	
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isSuperuser: state.auth.isSuperuser
})

export default connect(mapStateToProps)(Navbar);
