import React, {Component} from 'react'
import './Content.css'
import Message from './Message'
import NewMessage from './NewMessage'
import axios from 'axios'

class Content extends Component {
	// Data
	state = {
		messages: []
	}
	// Functions

	componentWillMount() {
		axios.get(`${process.env.REACT_APP_API}/api/messages`).then((res) => {
			this.setState({
				messages: res.data
			})
		}).catch((err) => {
			console.log('err', err)
		})
	}

	componentWillReceiveProps(props) {
		axios.get(`${process.env.REACT_APP_API}/api/messages?channel=${props.channel}`).then((res) => {
			this.setState({
				messages: res.data
			})
		}).catch((err) => {
			console.log('err', err)
		})
	}

	createMessage = (e, text) => {
		e.preventDefault()
		let message = {
			body: text,
			channel: this.props.channel
		}
		axios.post(
			`${process.env.REACT_APP_API}/api/messages`,
			message,
			{headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}}
		).then((res) => {
			let messages = this.state.messages
			messages.push(res.data)
			this.setState({messages})
		}).catch((err) => {
			console.log('err', err)
		})
	}

	// Render
	render() {
		return (
			<div id="content">
				<div id="messages">
					{
						this.state.messages.map((m) => {
							return <Message message={m} key={m._id} />
						})
					}
				</div>
				<NewMessage createMessage={this.createMessage} />
			</div>
		)
	}
}

export default Content
