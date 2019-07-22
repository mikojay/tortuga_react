import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'
import profile from './images/profile.jpg';

class Profile extends Component {
	// Data
	state = {
		email: '',
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

	changeGithub = (e) => {
		this.setState({password: e.target.value})
	}

	login = (e) => {
		e.preventDefault()
		axios.post(`mongodb://localhost:27017/tortuga/api/profile`, this.state).then((res) => {
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
								<form>
								<div className="form-row p-2">
									<div className="col">
									  <div className="form-group">
									    <label>
												<i className="fab fa-linkedin"></i>
											</label>
									    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Linkedin"/>
									  </div>
									  <div className="form-group">
									    <label>
									    	<i className="fab fa-github-square"></i>
									    </label>
									    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="GitHub"/>
									  </div>
										<div className="form-group">
									    <label>
												<i className="fab fa-facebook"></i>
									    </label>
									    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Facebook"/>
									  </div>
										</div>
										<div className="col">
										<div className="form-group">
									    <label>
									    	<i className="fas fa-at"></i>
									    </label>
									    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" value={this.state.email} onChange={(e) => this.changeEmail(e)}/>
									  </div>
										<div className="form-group">
									    <label>
									    	<i className="fab fa-whatsapp"></i>
									    </label>
									    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="WhatsApp"/>
									  </div>
										<div className="form-group">
									    <label>
									    	<i className="fab fa-instagram"></i>
									    </label>
									    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Instagram"/>
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
