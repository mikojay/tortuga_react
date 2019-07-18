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

	// Render
	render() {
		return (
			<div	id="leftcol">
			<li className={ this.state.category.active ? 'active' : '' } onClick={() => this.props.selectCategory(this.state.category._id)}>#{this.state.category.name}</li>
			</div>
		)
	}
}

export default Category
