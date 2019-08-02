import React, { Component } from 'react'
import './css/App.css'

import Place from './Place'
// import axios from 'axios'
import DropDownBar from './DropDownBar';
export default class Places extends Component {
  //data
  state = {
    places:[],
    sort:'Top five '
  }
  //Functions
	componentWillReceiveProps(props){
		console.log('props', props);
		this.setState({places: props.places})
	}

  componentWillMount(){
		this.props.getPlaces()
		// this.props.getPlaces()
    // axios.get('http://localhost:2200/api/places').then((res)=>{
    //   //console.log(res)
    //   this.setState({
    //     places:res.data
    //   })
    // }).catch((err)=>{
    //   console.log('Error Axios Get ',err)
    // })
  }
//   handleChange = (e)=>{
//     this.setState({
//         sort:e.target.value
//     })
//     console.log(e.target.value)
// }
// ========
handleChange = (e)=>{
  this.setState({
    sort:e.target.value
})
this.props.getPlaces(null, e.target.value)

}


// =======
  render() {
    return (

      <div >


          <DropDownBar handleChange={this.handleChange} />


          <div id="cardWrap" className=" pl-4 mt-3">
           {/* PLACE */}
           {
              this.state.places.map((p)=>{
                return  <Place place={p} key={p._id} />
              })
           }


          </div>


      </div>


    )
  }
}
