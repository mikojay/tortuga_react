import React, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/profile.css'
import Logout from './Logout'
import { Link } from 'react-router-dom'


// import profile from './images/profile.jpg';
import logo from './images/logo1.png';
class Profile extends Component {
	// Data
	state = {
		user: [],
		email: '',
		password: '',
		github: '',
		whatsapp: '',
		linkedin: '',
		facebook: '',
		instagram: '',
		error: '',
		// toMain:false
	}
	// Functions
	handleChange =(e)=>{
		this.setState({
			[e.target.name]:e.target.value
		})
	}
	//
	// changeEmail = (e) => {
	// 	this.setState({email: e.target.value})
	// }
	//
	// changePassword = (e) => {
	// 	this.setState({password: e.target.value})
	// }
	//
	// changeGithub = (e) => {
	// 	this.setState({github: e.target.value})
	// }
	//
	// changeWhatsapp = (e) => {
	// 	this.setState({whatsapp: e.target.value})
	// }
	//
	// changeLinkedin = (e) => {
	// 		this.setState({linkedin: e.target.value})
	// }
	//
	// changeFacebook = (e) => {
	// 	this.setState({facebook: e.target.value})
	// }
	//
	// changeInstagram = (e) => {
	// 	this.setState({instagram: e.target.value})
	// }

	getUserData = () => {
		axios.get(`${process.env.REACT_APP_API}/api/profile`, {headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}}).then((res) => {
			console.log('00000000000000000res',res);

			// if (!res.data.token) {

	}
)}

getUser = () => {
	axios.get(`${process.env.REACT_APP_API}/api/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('GET USER_DATA', res.data)
            this.setState({
                user: res.data,
                // value: res.data[2].name
            })
            console.log(this.state)
        }).catch((err) => {
            console.log('Error', err)
        })
}

	componentWillMount() {
		this.getUserData()
		this.getUser()
	}

//if (this.state.faceb)


	update = (e) => {
		let updatedUser = {
			email: this.state.email === '' ? this.state.user.email : this.state.email,
			password: this.state.password === '' ? this.state.user.password : this.state.password,
			github: this.state.github === '' ? this.state.user.github : this.state.github,
			whatsapp: this.state.whatsapp === '' ? this.state.user.whatsapp : this.state.whatsapp,
			linkedin: this.state.linkedin === '' ? this.state.user.linkedin : this.state.linkedin,
			facebook: this.state.facebook === '' ? this.state.user.facebook : this.state.facebook,
			instagram: this.state.instgram === '' ? this.state.user.instagram : this.state.instagram,
			}

		e.preventDefault()
		axios.patch(`${process.env.REACT_APP_API}/api/profile`, updatedUser, {headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}}).then((res) => {
				localStorage.setItem('token', res.data.token)
				this.getUserData()
				window.location = '/'
		}).catch((err) => {
			console.log('err', err)
		})

	}


	// Render
	render() {

		return (
			<div className="container-fluid">
  <div className="row">
    <div id="leftCol" className="col p-0">
			{/*  Start left col END */}

      <div className="wrapProfile p-2">
        <div id="usrImageDisplay" className="row">
          <div className="box col">
						<div className="logoWrapper">
							<img src={logo} alt="..." className="img-logo"/>
						</div>
						<img src={this.state.user.file} alt="..." className="rounded-circle"/>
						
					</div>
				</div>
							{/*  ProfilPic END */}

			      </div>
			    </div>


					{/*  START SOCIALS */}
			    <div id="rightCol" className="col-9 p-0 ">
						<div className='float-right p-5'>
							<Link to='/' >
	 						 <button className="button_places btn btn-outline-info mr-5">places</button>
	 					 </Link>
							<Logout/>
						</div>
						{/*  SOCIALS Component */}
			      <div id="userinformation" className="p-4">
							<div className="username p-2 mt-2">
								<p>{this.state.user.name}</p>
								<p>{this.state.user.email}</p>
								<p>Batch: {this.state.user.batch}</p>

							</div>
							{/*  SOCIAL */}
								<form onSubmit={(e) => this.update(e)}>
									<div className="title mt-5">
										<h2>Edit info</h2>
									</div>

									<div className="row p-2 mt-3">
										<div className="form-group icon col-md-6">
											<label>
												<i className="fas fa-at"></i>
											</label>
											<input
												name='email'
												 type="text"
												  className="form-control"
													 placeholder="Email"
													 value={this.state.email}
													 onChange={(e) => this.handleChange(e)}/>
										</div>
										<div className="form-group icon col-md-6">
											<label>
												<i className="fas fa-key"></i>
											</label>
											<input
												name='password'
												type="password"
												className="form-control"
												placeholder="Password"
												value={this.state.password}
												onChange={(e) => this.handleChange(e)}/>
										</div>
									</div>

								<div className="row p-2">
									<div className="col">
										<div className="form-group icon">
											<label>
												<i className="fab fa-linkedin"></i>
											</label>
											<input
												name='linkedin'
												type="text"
												 className="form-control"
												  placeholder="Linkedin"
													 value={this.state.linkedin}
													 onChange={(e) => this.handleChange(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-github-square"></i>
											</label>
											<input
												name='github'
												 type="text"
												  className="form-control"
													 placeholder="GitHub"
													  value={this.state.github}
														 onChange={(e) => this.handleChange(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-facebook"></i>
												<input
													name='facebook'
													 type="text"
													  className="form-control"
														 placeholder="Facebook"
														  value={this.state.facebook}
															 onChange={(e) => this.handleChange(e)}/>
											</label>
										</div>
									</div>

									<div className="col">
										<div className="form-group icon">
											<label>
												<i className="fab fa-whatsapp"></i>
											</label>
											<input
												name='whatsapp'
												 type="text"
												  className="form-control"
													 placeholder="WhatsApp"
													  value={this.state.whatsapp}
														 onChange={(e) => this.handleChange(e)}/>
										</div>
										<div className="form-group icon">
											<label>
												<i className="fab fa-instagram"></i>
											</label>
											<input
												name='instagram'
												 type="text"
												  className="form-control"
													 placeholder="Instagram"
													  value={this.state.instagram}
														 onChange={(e) => this.handleChange(e)}/>
												{/*   // <Link to='/' >*/}
 												 <button id="socialbutton" className="button btn btn rounded-pill" type="submit">Edit Socials</button>
 											 {/*</Link>*/}

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
