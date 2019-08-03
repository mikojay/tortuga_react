import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Signup from './Signup'
import Create from './Create'
import App from './App'
import Profile from './profile'
import Login from './Login'

class Routes extends Component {
	// Data
	state = {}
	// Functions
	checkAuth = () => {
		if (localStorage.getItem('token')) {
			return true
		} else {
			return false
		}
	}
	auth = () => {
		if (this.checkAuth()) {
			window.location.href = '/'
		}
	}
	// Render
	render() {
		return (
		// <App/>

			<BrowserRouter>
				<Switch>
					<Route path="/login" component={() => <Login auth={this.auth} />} />
					<Route path="/signup" component={() => <Signup auth={this.auth} />} />
					<Route path='/create' component={() => <Create auth={this.auth} />} />
					<Route path="/profile" render={() => (
									this.checkAuth() ? (<Profile />) : (<Redirect to="/login" />)
								)} />
					<Route path="/" render={() => (
							this.checkAuth() ? (<App />) : (<Redirect to="/login" />)
						)} />

				</Switch>
			</BrowserRouter>
		)
	}
}

export default Routes
