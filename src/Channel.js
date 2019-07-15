import React, {Component} from 'react'

class Channel extends Component {
	// Data
	state = {
		channel: this.props.channel
	}
	// Functions
	componentWillMount() {
		console.log(this.props)
	}

	// Render
	render() {
		return (
			<li className={ this.state.channel.active ? 'active' : '' } onClick={() => this.props.selectChannel(this.state.channel._id)}># {this.state.channel.name}</li>
		)
	}
}

export default Channel
