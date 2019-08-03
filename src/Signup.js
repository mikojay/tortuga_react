import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './css/signup.css'
import logo from './images/logo.png'
export default class Signup extends Component {
  // Data
  state = {
    name: '',
    email: '',
		batch: '',
    password: '',
    file: null
  }
  // Functions
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  //File handle
  addfile = (e) => {
    this.setState({
        file: e.target.files[0]
    })
}
  signup = (e) => {
    e.preventDefault()
    console.log('state', this.state)
    let form_holder = new FormData()
    form_holder.append('file', this.state.file)
    form_holder.append('name', this.state.name)
    form_holder.append('email', this.state.email)
		form_holder.append('batch', this.state.batch)
    form_holder.append('password', this.state.password)

    axios.post(`http://localhost:2200/api/signup`, form_holder).then((res) => {
      console.log('res', res)
      localStorage.setItem('token', res.data)
      this.props.auth()
    }).catch((err) => {
      console.log('err', err)
    })
    // this.setState({
    //   name: '',
    //   email: '',
    //   password: '',
    //   file:null
    // })
  }

  addFile = (e) => {
    this.setState({
      file: e.target.files[0]
    }, () => {
      console.log('state', this.state)
    })
  }

  render() {
    return (
      <div>
        <div id="main-container-signup" className=" container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="card" style={{ width: '18rem' }}>
            <img className='w-50 m-auto' src={logo} alt="logo" />
            <div className="card-body">
              <div className='text-center'>
                <label className='font-weight-bolder '>Signup</label>
              </div>
              <form  >
                <div className="form-group">
                  <label >Name</label>
                  <input
                    name='name'
                    value={this.state.name}
                    onChange={(e) => this.handleChange(e)}
                    type="text" className="form-control"
                    placeholder="Enter name" required/>
                </div>
                <div className="form-group">
                  <label >Email address</label>
                  <input
                    name='email'
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                    type="email" className="form-control"
                    placeholder="Enter email" required/>
                  <small
                    className="form-text text-muted">
                    We'll never share your email with anyone else.
                   </small>
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input
                    name='password'
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                    type="password" className="form-control"
                    placeholder="Password" required/>
                </div>
								<label >Batch</label>
								<input
									name='batch'
									value={this.state.batch}
									onChange={(e) => this.handleChange(e)}
									type="text" className="form-control"
									placeholder="Enter your batch number" required/>
								<div className="form-group mt-3">
                  <input type="file" onChange={(e) => this.addFile(e)}/>
                </div>

                <button
                  onClick={(e) => {
                    this.signup(e);
                  }}
                  type="submit"
                  className="btn btn-primary mt-3">Signup</button><br></br>
                <small className='text-small float-right' > <Link to='/login' >Login</Link> </small>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}









// import React, {Component} from 'react'
// import axios from 'axios'
//
// class Signup extends Component {
// 	// Data
// 	state = {
// 		name: '',
// 		email: '',
// 		password: ''
// 	}
// 	// Functions
// 	changeName = (e) => {
// 		this.setState({name: e.target.value})
// 	}
//
// 	changeEmail = (e) => {
// 		this.setState({email: e.target.value})
// 	}
//
// 	changePassword = (e) => {
// 		this.setState({password: e.target.value})
// 	}
//
// 	signup = (e) => {
// 		e.preventDefault()
// 		axios.post(`mongodb://localhost:27017/tortuga/api/signup`, this.state).then((res) => {
// 			localStorage.setItem('token', res.data.token)
// 			this.props.auth()
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
// 							<form onSubmit={(e) => this.signup(e)}>
// 								<div className="form-group">
// 									<input type="text" className="form-control" placeholder="Full Name..." value={this.state.name} onChange={(e) => this.changeName(e)} />
// 								</div>
// 								<div className="form-group">
// 									<input type="email" className="form-control" placeholder="Email..." value={this.state.email} onChange={(e) => this.changeEmail(e)} />
// 								</div>
// 								<div className="form-group">
// 									<input type="password" className="form-control" placeholder="Password..." value={this.state.password} onChange={(e) => this.changePassword(e)} />
// 								</div>
// 								<button type="submit" className="btn btn-success">Signup</button>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
// }
//
// export default Signup
