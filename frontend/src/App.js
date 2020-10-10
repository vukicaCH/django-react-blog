import React, {useEffect} from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import { Provider, connect } from 'react-redux'

import Layout from './containers/Layout';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Home from './containers/Home';
import Post from './containers/Post';
import AddNewPost from './containers/AddNewPost';
import EditPost from './containers/EditPost';
import DeletePost from './containers/DeletePost';
import SearchPost from './containers/SearchPost';
import Logout from './containers/Logout';
import NotFound from './containers/NotFound';
import store from './store';

function App() {
	

	
  return (
  <Provider store={store}>
    <div className="App">
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/logout" component={Logout} />
					<Route exact path="/search/:keyword" component={SearchPost} />
					<Route exact path="/add-new-post" component={AddNewPost} />
					<Route exact path="/:id/edit-post" component={EditPost} />
					<Route exact path="/:id/delete-post" component={DeletePost} />
					<Route exact path='/' component={Home} />
					<Route exact path='/:id' component={Post} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
    </div>
  </Provider>
  );
}

export default App;
