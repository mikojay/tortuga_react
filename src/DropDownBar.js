import React, { Component } from 'react'

export default class Bar extends Component {

    //function

  render() {

    return (
      <div>
      <form action="">
		  <div className="form-group d-flex">
    <select   onChange={this.props.handleChange} className="form-control" id="selectPlaceCategory">
      <option value='Top Five' >Top Five</option>
      <option value='date' >Date</option>
      <option value='likes' >Likes</option>
      <option value='dislikes' >Dislikes</option>
    </select>
  </div>
		  </form>
      </div>
    )
  }
}
