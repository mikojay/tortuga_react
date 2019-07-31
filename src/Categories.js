import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import profile from './images/profile.jpg'
import Category from './Category'
import axios from 'axios'

class Categories extends Component {
	// Data
	state = {
		categories: []
	}

	//Lifecycle
	componentDidMount() {
		axios.get('http://localhost:2200/api/categories').then((res) => {
			res.data[0].active = true
			this.setState({
				categories: res.data
			})
			this.selectCategory(res.data[0]._id)
			console.log('res.data[0]', res.data[0])
		}).catch((err) => {
			console.log('err', err)
		})
	}
	//Functions
	selectCategory = (id) => {
	let categories = this.state.categories
	categories.forEach((c) => delete c.active)
	let category = categories.find((c) => c._id === id)
	category.active = true
	this.setState({categories})
	this.props.getPlaces(id)
	console.log('ID PLACE', this.props.getPlaces(id));
}
	// Render
	render() {
		return (
			<div>
			 <nav className="navbar navbar-light bg-light w-100 d-flex flex-column alig">
				 <div className="imageWrapper ">
					 <img src={profile} alt="..." className="img-thumbnail">
					 </img>
				 </div>
				 <h4 className="small ">Michael Bronk</h4>
			 </nav>
			 <div className="wrap p-2">
				 <div className="card-footer bg-transparent border-dark">
					 <div id="category">
					 <h5 className="lead small text-uppercase font-weight-bold">Categories</h5>
					 {
						this.state.categories.map((c) => {
							return <Category category={c} key={c._id} selectCategory={this.selectCategory} />
						})
					}
				</div>
				 </div>
			 </div>
		 </div>
		)
	}
}

export default Categories
