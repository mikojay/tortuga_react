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
}
	// Render
	render() {
		return (
			<div>
				<div id="usrImageDisplay" class="row">
 						<div class="imageWrapper col ml-4">
 							<img src={profile} alt="..." class="img-lilprofile rounded-circle"/>
 						</div>
 						<div class="username col mr-4">
 							<p>Michael</p>
 							<p>Brooks</p>
 							<p>batch: 99</p>
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
