import React, {Component} from 'react'

class Category extends Component {
	// Data
	state = {
		category: this.props.category
	}
	// Functions
	componentWillMount() {
		console.log(this.props)
	}
	getClass = () => {
		let cl = "badge badge-dark ";
		if (this.state.category === 'active') {
			cl += 'active'
		}
		return cl
	}

	// Render
	render() {
		return (
			<div	id="leftcol">
			<li className={  this.getClass() } onClick={() => this.props.selectCategory(this.state.category._id)}>{this.state.category.name}</li>
			</div>
		)
	}
}

export default Category
