import React, {Component} from 'react'
import './Content.css'
import moment from 'moment'

class Message extends Component {
	// Data
	state = {
		message: this.props.message
	}
	// Functions
	componentWillMount() {
		let message = this.state.message
		message.date = moment(message.date).format('D MMM YYYY - h:mma')
		this.setState({message})
	}
	// Render
	render() {
		return (
			<div className="message">
				<span className="author">{this.state.message.author.name}</span>
				<span className="date">{this.state.message.date}</span>
				<div className="body">{this.state.message.body}</div>
			</div>
		)
	}
}

export default Message
