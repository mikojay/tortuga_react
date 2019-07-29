import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'
import profile from './images/profile.jpg';

class Profile extends Component {
	// Data
	state = {
		email: '',
		password: '',
		github: '',
		whatsapp: '',
		linkedin: '',
		facebook: '',
		instagram: '',
		error: ''
	}
	// Functions

	changeEmail = (e) => {
		this.setState({email: e.target.value})
	}

	changePassword = (e) => {
		this.setState({password: e.target.value})
	}

	changeGithub = (e) => {
		this.setState({github: e.target.value})
	}

	changeWhatsapp = (e) => {
		this.setState({whatsapp: e.target.value})
	}

	changeLinkedin = (e) => {
			this.setState({linkedin: e.target.value})
	}

	changeFacebook = (e) => {
		this.setState({facebook: e.target.value})
	}

	changeInstagram = (e) => {
		this.setState({instagram: e.target.value})
	}

	getUserData = () => {
		axios.get('http://localhost:2200/api/profile', {headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}}).then((res) => {
			console.log('res',res);
			// if (!res.data.token) {
			if (this.state) {
				this.setState({
					email: res.data.email,
					github: res.data.github,
					facebook: res.data.facebook,
					whatsapp: res.data.whatsapp,
					linkedin: res.data.linkedin,
					password: res.data.password,
					instagram: res.data.instagram
				})
				// console.log('E',e);
				// console.log('RES DATA', res.data);
			} else {
				// this.setState({
				// 	error: ''
				// })

			}
	}
)}


	componentWillMount() {
		this.getUserData()
	}


	update = (e) => {
		e.preventDefault()
		axios.patch(`http://localhost:2200/api/profile`, this.state, {headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}}).then((res) => {
				localStorage.setItem('token', res.data.token)
				this.getUserData()
		}).catch((err) => {
			console.log('err', err)
		})
	}


	// Render
	render() {
		return (
			<div className="container-fluid">
			  <div className="row">
			    <div id="leftCol" className="col-3 p-0">
           {/* CATEGORIES */}

					 {/*  ProfilPic */}
			      <div className="wrap p-2">
			        <div id="usrImageDisplay" className="row">
			          <div className="col">
									<div className="imageWrapper "> <img src={profile} alt="..." className="img-thumbnail"/> </div>
			          </div>
								<div className="col p-4">
									<button className="btn btn-primary btn-block" type="submit">Change profile picture</button>
								</div>
			        </div>
							{/*  ProfilPic END */}


							{/*  Category */}
			        <div className="card-footer border-dark">
			          <h5 className="lead small text-uppercase font-weight-bold">Categories</h5>
			          <span className="badge badge-dark">#food</span> <span className="badge badge-dark">#travel</span> <span className="badge badge-dark">#wellness</span> <span className="badge badge-dark">#services</span>
						 <span className="badge badge-dark">#sports</span>
						 <div className="col p-3">
						 </div>
					  </div>
			      </div>
			    </div>
					{/*  END CATEGORIES */}

					{/*  START SOCIALS */}
			    <div id="rightCol" className="col-9 p-0 ">
			      <nav className="navbar navbar-light w-100 border-bottom"> <span className="navbar-brand mb-0 h1 lead font-weight-bold mt-4">Michael Bronk,<br/>Batch 99</span>
			      </nav>
						{/*  SOCIALS Component */}
			      <div id="dataDisplay" className="container-fluid mt-3">
			        <div id="cardWrap" className=" p-3">
							{/*  SOCIAL */}
								<h2>Socials</h2>
								<form onSubmit={(e) => this.update(e)}>
								<div className="form-row p-2">
									<div className="col">
										<div className="form-group">
									    <label>
									    	<i className="fas fa-at"></i>
									    </label>
									    <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.changeEmail(e)}/>
									  </div>
										<div className="form-group">
									    <label>
									    	<i className="fas fa-key"></i>
									    </label>
									    <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.changePassword(e)}/>
									  </div>
									  <div className="form-group">
									    <label>
												<i className="fab fa-linkedin"></i>
											</label>
									    <input type="text" className="form-control" placeholder="Linkedin" value={this.state.linkedin} onChange={(e) => this.changeLinkedin(e)}/>
									  </div>
										</div>
										<div className="col">
											<div className="form-group">
										    <label>
										    	<i className="fab fa-github-square"></i>
										    </label>
										    <input type="text" className="form-control" placeholder="GitHub" value={this.state.github} onChange={(e) => this.changeGithub(e)}/>
										  </div>
											<div className="form-group">
										    <label>
													<i className="fab fa-facebook"></i>
										    </label>
										    <input type="text" className="form-control" placeholder="Facebook" value={this.state.facebook} onChange={(e) => this.changeFacebook(e)}/>
										  </div>
										<div className="form-group">
									    <label>
									    	<i className="fab fa-whatsapp"></i>
									    </label>
									    <input type="text" className="form-control" placeholder="WhatsApp" value={this.state.whatsapp} onChange={(e) => this.changeWhatsapp(e)}/>
									  </div>
										<div className="form-group">
									    <label>
									    	<i className="fab fa-instagram"></i>
									    </label>
									    <input type="text" className="form-control" placeholder="Instagram" value={this.state.instagram} onChange={(e) => this.changeInstagram(e)}/>
									  </div>
									</div>

								<button className="btn btn-primary btn-block m-3" type="submit">Edit Socials</button>
							</div> {/*  Socials END */}
							</form>
					  	</div>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
}

export default Profile
