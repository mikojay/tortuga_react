import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import logo from './images/logo.png';
// import profile from './images/profile.jpg'
import Category from './Category'
import axios from 'axios'

class Categories extends Component {
	// Data
	state = {
		categories: [],
		user: []
	}

	//Lifecycle
	componentDidMount() {
		axios.get(`${process.env.REACT_APP_API}/api/categories`).then((res) => {
			res.data[0].active = true
			this.setState({
				categories: res.data
			})
			this.selectCategory(res.data[0]._id)
			// console.log('res.data[0]', res.data[0])
		}).catch((err) => {
			console.log('err', err)
		})
		this.getUserData()
	}
	//Functions
	selectCategory = (id) => {
	let categories = this.state.categories
	categories.forEach((c) => delete c.active)
	let category = categories.find((c) => c._id === id)
	category.active = true
	this.setState({categories})
	this.props.getPlaces(id)
}

getUserData = () => {
	axios.get(`${process.env.REACT_APP_API}/api/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('RES_DATA', res.data)
            this.setState({
                user: res.data,
                // value: res.data[2].name
            })
            console.log(this.state)
        }).catch((err) => {
            console.log('Error', err)
        })
}
	// Render
	render() {
		return (
			<div>

				<div className="row p-2 mt-3 ">
 						<div className=" col ">
							<img  src={this.state.user.file}  alt="..." className="profile-image" />
 						</div>
 						<div className="usernameapp col text-right mr-4">
 							<p>{this.state.user.name}</p>
							<p>Batch: {this.state.user.batch}</p>
 							<p>{this.state.user.email}</p>
 						</div>
         </div>
				 <div className="p-2 ml-2 mt-2 d-flex justify-content-around">
					 <Link to='/profile' >
						 <button className="button_profile btn btn-outline-dark">profile</button>
					 </Link>
					 <Link to='/create' >
						 <button className="button_create btn btn-outline-dark">create place</button>
					 </Link>

				 </div>
			 <div className="wrap p-2">

					 <div id="category">
					 {
						this.state.categories.map((c) => {
							return <Category category={c} key={c._id} selectCategory={this.selectCategory} />
						})
					}
				</div>
				<img id='logo' src={logo} alt="Toptuga logo" className="img-logo-main mt-4"></img>
			 </div>
		 </div>
		)
	}
}

export default Categories
