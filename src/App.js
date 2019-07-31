import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Categories from './Categories'
import Places from './Places'

class App extends Component {
	// Data
	state = {
		category: ''
	}
	// Functions
	getPlaces = (id, sort) => {
		this.setState({
			category: id
		})
	}
	// Render
	render() {
		return (
			<div>
			        <div className="container-fluid">
			          <div className="row">
			            {/* LEFT COLUMN */}
			          <div id="leftCol" className="col-3 p-0 ">
			            <Categories getPlaces={this.getPlaces}/>
			             </div>
			              {/* RIGHT COLUMN */}
			             <div id="rightCol" className="col-9 p-0 ">
			              <Places />
			             </div>
			          </div>
			        </div>
			      </div>
		)
	}
}

export default App
