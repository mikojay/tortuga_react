import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './profile.css'
import profile from './images/profile.jpg';
import logo from './images/logo1.png';
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
			{/*  Start left col END */}

      <div className="wrapProfile p-2">
        <div id="usrImageDisplay" className="row">
          <div className="box col">
						<div className="logoWrapper">
							<img src={logo} alt="..." className="img-logo"/>
						</div>
						<div className="imageWrapper">
							<img src={profile} alt="..." className="img-profile rounded-circle"/>
						</div>
						<button id="profilepicbutton" className="button btn btn rounded-pill mt-5" type="submit">Edit profile picture</button>
					</div>
				</div>
							{/*  ProfilPic END */}

			      </div>
			    </div>


					{/*  START SOCIALS */}
			    <div id="rightCol" className="col-9 p-0 ">

						{/*  SOCIALS Component */}
			      <div id="userinformation" className="mt-4 p-4">
							<div className="username p-2 m-2">
							<p>first name:</p>
							<p>last name:</p>
							<p>batch:</p>
						</div>
							{/*  SOCIAL */}
								<form onSubmit={(e) => this.update(e)}>
									<div className="title">
										<h2>Edit info</h2>
									</div>

									<div className="row p-2">
										<div className="form-group icon col-md-6">
											<label>
												<i className="fas fa-at"></i>
											</label>
											<input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) => this.changeEmail(e)}/>
										</div>
										<div className="form-group icon col-md-6">
											<label>
												<i className="fas fa-key"></i>
											</label>
											<input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={(e) => this.changePassword(e)}/>
										</div>
									</div>

								<div className="row p-2">
									<div className="col">
										<div className="form-group icon">
											<label>
												<i className="fab fa-linkedin"></i>
											</label>
											<input type="text" className="form-control" placeholder="Linkedin" value={this.state.linkedin} onChange={(e) => this.changeLinkedin(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-github-square"></i>
											</label>
											<input type="text" className="form-control" placeholder="GitHub" value={this.state.github} onChange={(e) => this.changeGithub(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-facebook"></i>
												<input type="text" className="form-control" placeholder="Facebook" value={this.state.facebook} onChange={(e) => this.changeFacebook(e)}/>
											</label>
										</div>
									</div>

									<div className="col">
										<div className="form-group icon">
											<label>
												<i className="fab fa-whatsapp"></i>
											</label>
											<input type="text" className="form-control" placeholder="WhatsApp" value={this.state.whatsapp} onChange={(e) => this.changeWhatsapp(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-instagram"></i>
											</label>
											<input type="text" className="form-control" placeholder="Instagram" value={this.state.instagram} onChange={(e) => this.changeInstagram(e)}/>
											<button id="socialbutton" className="button btn btn rounded-pill" type="submit">Edit Socials</button>
										</div>
									</div>
							 {/*  Socials END */}
							 </div>
							</form>

				    </div>
				  </div>
				</div>
			</div>
		)
	}
}

export default Profile
