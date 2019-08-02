import React, { Component } from 'react'
import Logout from './Logout'
export default class Bar extends Component {

    //function

  render() {

    return (
      <div>
      <form action="">
		  <div className="toprow p-2 m-3">
    <select   onChange={this.props.handleChange} className="filterbutton btn-lg mr-3" id="selectPlaceCategory">
      <option value='-date' >Date</option>
      <option value='-likes' >Likes</option>
      <option value='-dislikes' >Dislikes</option>
			<option value='Top Five' >Top Five</option>
    </select>
		<Logout/>
  </div>
		  </form>
      </div>
    )
  }
}
