import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import axios from 'axios'
import logo from './images/logo.png';
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
			axios.get(`http://localhost:2200/api/places?category=${id}`).then((res)=>{
	      //console.log(res)
	      this.setState({
	        places:res.data
	      })
			})
		} else if (sort) {
			console.log('sort', sort);
			// handleChange(e)
			axios.get(`http://localhost:2200/api/places?sort=${sort}`).then((res)=>{
				console.log('responds', res);
	      //console.log(res)
	      this.setState({
	        places:res.data
	      })
			})
		} else {
			// axios.get('http://localhost:2200/api/places').then((res)=>{
			// 	//console.log(res)
			// 	this.setState({
			// 		places:res.data
			// 	})
			// })
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
			          <div id="leftCol" className="col-3 p-0 ">
			            <Categories getPlaces={this.getPlaces}/>
									<img id='logo' src={logo} alt="Toptuga logo" className="img-logo"></img>
			             </div>
			              {/* RIGHT COLUMN */}
			             <div id="rightCol" className="col-9 p-0 ">
			              <Places places={this.state.places} getPlaces={this.getPlaces}/>
			             </div>
			          </div>
			        </div>
			      </div>
		)
	}
}

export default App
