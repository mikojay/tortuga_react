import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import axios from 'axios'
// import logo from './images/logo.png';
import Categories from './Categories'
import Places from './Places'

class App extends Component {
	// Data
	state = {
		category: '',
		places: []
	}
	// Functions


	getPlaces = (id, sort) => {


		if (id) {
			console.log('places id', id);
			axios.get(`${process.env.REACT_APP_API}/api/places?category=${id}`).then((res)=>{
	      //console.log(res)
	      this.setState({
	        places:res.data
	      })
			})
		} else if (sort) {
			console.log('sort', sort);
			// handleChange(e)
			axios.get(`${process.env.REACT_APP_API}/api/places?sort=${sort}`).then((res)=>{
				console.log('responds', res);
	      //console.log(res)
	      this.setState({
	        places:res.data
	      })
			})
		} else {

	}
}
    // }).catch((err)=>{
    //   console.log('Error Axios Get ',err)
    // })



	// Render
	render() {
		return (
			<div>
			        <div className="container-fluid">
			          <div className="row">
			            {/* LEFT COLUMN */}
			          	<div id="leftCol">
			            	<Categories getPlaces={this.getPlaces}/>
			          	</div>
			            {/* RIGHT COLUMN */}
			            <div id="rightCol">
			              <Places places={this.state.places} getPlaces={this.getPlaces}/>
			            </div>
			          </div>
			        </div>
			      </div>
		)
	}
}

export default App
