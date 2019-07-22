import React, { Component } from 'react'

export default class Bar extends Component {
    state={
        choice:'Top Five'
    }
    //function
     handleChange = (e)=>{
        this.setState({
            choice:e.target.value
        })
        console.log(e.target.value)
    }
  render() {
      console.log('>>>>>>Current',this.state.choice)
    return (
      <div>
      <form action="">
		  <div className="form-group d-flex">
    <select   onChange={this.handleChange} className="form-control" id="selectPlaceCategory">
      <option name='Top Five' >Top Five</option>
      <option name='Date' >Date</option>
      <option name='Likes' >Likes</option>
      <option name='Dislikes' >Dislikes</option>
    </select>
  </div>
		  </form>
      </div>
    )
  }
}
