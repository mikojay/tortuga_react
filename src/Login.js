import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './css/login.css'
import logo from './images/logo.png'

class Login extends Component {
  // Data
  state = {
    email: '',
    password: '',
    error: ''
  }
  // Functions

  changeEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  changePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:2200/api/login`, this.state).then((res) => {
      if (!res.data.token) {
        this.setState({
          error: res.data
        })
      } else {
        this.setState({
          error: ''
        })
        localStorage.setItem('token', res.data.token)
        this.props.auth()
      }
    }).catch((err) => {
      console.log('err', err)
    })
  }
  render() {
    return (
      <div>
        <div id="main-container" className=" container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="card" style={{ width: '18rem' }}>
            <img className='w-50 m-auto' src={logo} alt="logo" />
            <h5 className='text-center'>Login</h5>
            <div className="card-body">
              <form onSubmit={(e) => this.login(e)} >
                <div className="form-group">
                  <label >Email address</label>
                  <input type="email"
                    className="form-control" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Enter email *"
                    value={this.state.email} onChange={(e) => this.changeEmail(e)}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password *"
                    value={this.state.password} onChange={(e) => this.changePassword(e)}
                    required
                  />
                </div>
                <div className='text-danger' >{this.state.error} </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <small>Don't have an account? <span className='text-info' > <Link to='/signup' >Signup</Link> </span> </small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login






// import React, {Component} from 'react'
// import axios from 'axios'
//
// class Login extends Component {
// 	// Data
// 	state = {
// 		email: '',
// 		password: '',
// 		error: ''
// 	}
// 	// Functions
//
// 	changeEmail = (e) => {
// 		this.setState({email: e.target.value})
// 	}
//
// 	changePassword = (e) => {
// 		this.setState({password: e.target.value})
// 	}
//
// 	login = (e) => {
// 		e.preventDefault()
// 		axios.post(`http://localhost:2200/api/login`, this.state).then((res) => {
// 			if (!res.data.token) {
// 				this.setState({
// 					error: res.data
// 				})
// 			} else {
// 				this.setState({
// 					error: ''
// 				})
// 				localStorage.setItem('token', res.data.token)
// 				this.props.auth()
// 			}
// 		}).catch((err) => {
// 			console.log('err', err)
// 		})
// 	}
//
// 	// Render
// 	render() {
// 		return (
// 			<div className="row">
// 				<div className="col-4 offset-4">
// 					<div className="card signup">
// 						<div className="card-body">
// 							<form onSubmit={(e) => this.login(e)}>
// 								<div className="form-group">
// 									<input type="email" className="form-control" placeholder="Email..." value={this.state.email} onChange={(e) => this.changeEmail(e)} />
// 								</div>
// 								<div className="form-group">
// 									<input type="password" className="form-control" placeholder="Password..." value={this.state.password} onChange={(e) => this.changePassword(e)} />
// 								</div>
// 								<div className="error">{this.state.error}</div>
// 								<button type="submit" className="btn btn-success">Login</button>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
// }
//
// export default Login
