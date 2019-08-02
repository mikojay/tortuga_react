import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import profile from './images/profile.jpg'
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
		axios.get('http://localhost:2200/api/categories').then((res) => {
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
	axios.get('http://localhost:2200/api/profile', {
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
				<div id="usrImageDisplay" className="row">
 						<div className="imageWrapper col ml-4">
 							<img src={profile} alt="..." className="img-lilprofile rounded-circle"/>
 						</div>
 						<div className="usernameapp col mr-4">
 							<p>{this.state.user.name}</p>
 							<p>{this.state.user.batch}</p>
 						</div>
         </div>
			 <div className="wrap p-2">

					 <div id="category">
					 {
						this.state.categories.map((c) => {
							return <Category category={c} key={c._id} selectCategory={this.selectCategory} />
						})
					}
				</div>

			 </div>
		 </div>
		)
	}
}

export default Categories
