import React, { Component } from 'react'
import './css/Create.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import logo from './images/logo.png'
import { Link } from 'react-router-dom'

export default class Create extends Component {
    state = {
        name: '',
        address: '',
        description: '',
        likes: 0,
        dislikes: 0,
        category: '',
        places: [],
        categories: [],
        value: '',
        file: null,
        toMain:false

    }
    //axios
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API}/api/categories`).then((res) => {
            console.log('RES_DATA', res.data)
            this.setState({
                categories: res.data,
                value: res.data[2].name
            })
            console.log(this.state)
        }).catch((err) => {
            console.log('Error', err)
        })
    }
    componentWillMount() {
        axios.get(`${process.env.REACT_APP_API}/api/places`).then((res) => {
            this.setState({
                places: res.data
            })
            console.log('axios get places',res.data)
        }).catch((err) => {
            console.log('err', err)
        })
    }
    // -------------------------------
    createPlace = (e) => {
        //--------------------
        let file_holder = new FormData()
        file_holder.append('file', this.state.file)
        file_holder.append('name', this.state.name)
        file_holder.append('likes', this.state.likes)
        file_holder.append('dislikes', this.state.dislikes)
        file_holder.append('address', this.state.address)
        file_holder.append('description', this.state.description)
        file_holder.append('category', this.state.category)
        console.log('file_holder', file_holder)

        //------------------
        // let place = {
        //     name: this.state.name,
        //     likes: this.state.likes,
        //     dislikes: this.state.dislikes,
        //     address:this.state.address,
        //     description:this.state.description,
        //     category: this.state.category,
        //     file:this.state.file
        // }
        axios.post(`${process.env.REACT_APP_API}/api/places`, file_holder,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((res) => {
          window.location = '/'
        }).catch((err) => {
            console.log('error>>>>>>', err)
        })
    }

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    handleLikes = (e) => {
        this.setState({
            likes: this.state.likes + 1

        })
        e.preventDefault();
    }
    handleDislikes = (e) => {
        this.setState({
            dislikes: this.state.dislikes + 1
        })
        e.preventDefault();
    }
    handleChange = (e) => {
        if (e.target.name === 'likes') {
        }
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        let radioList = document.getElementsByClassName('form-check-input')
        for (let i = 0; i < radioList.length; i++) {
            radioList[i].checked = false
        }
        this.setState({
            name: '',
            address: '',
            description: '',
            likes: 0,
            dislikes: 0,
            category: '',
            file: null,
            toMain:true

        })

    }
    // __________
    handleOptionChange = (e) => {
        // console.log('e', e.target.value)
        this.setState({
            category: e.target.value
        }, () => {
            // console.log('this.state.category', this.state.category)
        })
    }
    //-----------
    addfile = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }
    //Redirect


    render() {


        return (
            <div>
                <div id="main-containerCreate" className=" container-fluid d-flex flex-column justify-content-center align-items-center">
									<div className='text-right w-100'>
									<Link to='/'>
			 						 <button className="button_places btn btn-outline-dark mr-5">places</button>
			 					 </Link>
								 </div>
                    <div className="card pt-0">
                    <img className='w-50 m-auto' src={logo} alt="logo" />
                        <div className="card-body mt-0 pt-0">
                            <form     >
                                <h6>Create A Place</h6>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        name='name'
                                        value={this.state.name}
                                        onChange={e => { this.handleChange(e) }}
                                        type="text"
                                        className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        name='address'
                                        value={this.state.address}
                                        onChange={e => { this.handleChange(e) }}
                                        type="text"
                                        className="form-control" />
                                </div>
                                <div className="form-group ">
                                    <label >Description</label>
                                    <textarea
                                        name='description'
                                        value={this.state.description}
                                        onChange={e => { this.handleChange(e) }}
                                        className="form-control" rows="1" />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group   m-auto">
                                            <label >Select Category</label>
                                            <select value={this.state.category} onChange={this.handleOptionChange} className="form-control"   >
                                                {
                                                    this.state.categories.map((e) => {
                                                        return <option key={e._id} value={e._id}  >{e.name} </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label>Rating</label>
                                        <div className='d-flex justify-content-start mb-4'>
                                            <div className="form-check mr-3">
                                                <input
                                                    name='likes'
                                                    value={this.state.likes}
                                                    onChange={e => { this.handleLikes(e) }}
                                                    type="checkbox"
                                                    className="form-check-input" />
                                                <label className="form-check-label">
                                                    <i className="far fa-thumbs-up"></i>
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    name='likes'
                                                    value={this.state.dislikes}
                                                    onChange={e => { this.handleDislikes(e) }}
                                                    type="checkbox"
                                                    className="form-check-input" />
                                                <label className="form-check-label">
                                                    <i className="far fa-thumbs-down"></i>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="file" onChange={this.addfile} />
                                </div>
                                <button onClick={(e) => {
                                    this.onSubmit(e);
                                    this.createPlace(e);

                                }} className="btn btn-primary small mt-4">Create </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}














// import React, { Component } from 'react'
// import './css/Create.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import axios from 'axios';
// import logo from './images/logo.png'
//
// export default class Create extends Component {
//     state = {
//         name: '',
//         address: '',
//         description: '',
//         likes: 0,
//         dislikes: 0,
//         category: '',
//         places: [],
//         categories: [],
//         value: '',
//         file: null
//     }
//     //axios
//     componentDidMount() {
//         axios.get('http://localhost:2200/api/categories').then((res) => {
//             console.log('RES_DATA', res.data[2])
//             this.setState({
//                 categories: res.data,
//                 value: res.data[2].name
//             })
//             console.log(this.state)
//         }).catch((err) => {
//             console.log('Error', err)
//         })
//     }
//     componentWillMount() {
//         axios.get('http://localhost:2200/api/places').then((res) => {
//             this.setState({
//                 places: res.data
//             })
//             console.log(res.data)
//         }).catch((err) => {
//             console.log('err', err)
//         })
//     }
//     // -------------------------------
//     createPlace = (e) => {
//         //--------------------
//         let file_holder = new FormData()
//         file_holder.append('file', this.state.file)
//         file_holder.append('name', this.state.name)
//         file_holder.append('likes', this.state.likes)
//         file_holder.append('dislikes', this.state.dislikes)
//         file_holder.append('address', this.state.address)
//         file_holder.append('description', this.state.description)
//         file_holder.append('category', this.state.category)
//         console.log('file_holder', file_holder)
//
//         //------------------
//         // let place = {
//         //     name: this.state.name,
//         //     likes: this.state.likes,
//         //     dislikes: this.state.dislikes,
//         //     address:this.state.address,
//         //     description:this.state.description,
//         //     category: this.state.category,
//         //     file:this.state.file
//         // }
//         axios.post('http://localhost:2200/api/places', file_holder,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             }
//         ).then((res) => {
//             let places = this.state.places
//             places.push(res.data)
//             console.log(res.data)
//             this.setState({ places })
//         }).catch((err) => {
//             console.log('error>>>>>>', err)
//         })
//     }
//
//     // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//
//     handleLikes = (e) => {
//         this.setState({
//             likes: this.state.likes + 1
//
//         })
//         e.preventDefault();
//     }
//     handleDislikes = (e) => {
//         this.setState({
//             dislikes: this.state.dislikes + 1
//         })
//         e.preventDefault();
//     }
//     handleChange = (e) => {
//         if (e.target.name === 'likes') {
//         }
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }
//     onSubmit = (e) => {
//         e.preventDefault()
//         console.log(this.state)
//         let radioList = document.getElementsByClassName('form-check-input')
//         for (let i = 0; i < radioList.length; i++) {
//             radioList[i].checked = false
//         }
//         this.setState({
//             name: '',
//             address: '',
//             description: '',
//             likes: 0,
//             dislikes: 0,
//             category: '',
//             file: null
//
//         })
//
//     }
//     // __________
//     handleOptionChange = (e) => {
//         // console.log('e', e.target.value)
//         this.setState({
//             category: e.target.value
//         }, () => {
//             // console.log('this.state.category', this.state.category)
//         })
//     }
//     //-----------
//     addfile = (e) => {
//         this.setState({
//             file: e.target.files[0]
//         })
//     }
//
//     render() {
//
//         return (
//             <div>
//                 <div id="main-containerCreate" className=" container-fluid d-flex flex-column justify-content-center align-items-center">
//                     <div className="card pt-0">
//                     <img className='w-50 m-auto' src={logo} alt="logo" />
//                         <div className="card-body mt-0 pt-0">
//                             <form     >
//                                 <h6>Create A Place</h6>
//                                 <div className="form-group">
//                                     <label>Name</label>
//                                     <input
//                                         name='name'
//                                         value={this.state.name}
//                                         onChange={e => { this.handleChange(e) }}
//                                         type="text"
//                                         className="form-control" />
//                                 </div>
//
//                                 <div className="form-group">
//                                     <label>Address</label>
//                                     <input
//                                         name='address'
//                                         value={this.state.address}
//                                         onChange={e => { this.handleChange(e) }}
//                                         type="text"
//                                         className="form-control" />
//                                 </div>
//                                 <div className="form-group ">
//                                     <label >Description</label>
//                                     <textarea
//                                         name='description'
//                                         value={this.state.description}
//                                         onChange={e => { this.handleChange(e) }}
//                                         className="form-control" rows="1" />
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-6">
//                                         <div className="form-group   m-auto">
//                                             <label >Select Category</label>
//                                             <select value={this.state.category} onChange={this.handleOptionChange} className="form-control"   >
//                                                 {
//                                                     this.state.categories.map((e) => {
//                                                         return <option key={e._id} value={e._id}  >{e.name} </option>
//                                                     })
//                                                 }
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="col-6">
//                                         <label>Rating</label>
//                                         <div className='d-flex justify-content-start mb-4'>
//                                             <div className="form-check mr-3">
//                                                 <input
//                                                     name='likes'
//                                                     value={this.state.likes}
//                                                     onChange={e => { this.handleLikes(e) }}
//                                                     type="checkbox"
//                                                     className="form-check-input" />
//                                                 <label className="form-check-label">
//                                                     <i className="far fa-thumbs-up"></i>
//                                                 </label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input
//                                                     name='likes'
//                                                     value={this.state.dislikes}
//                                                     onChange={e => { this.handleDislikes(e) }}
//                                                     type="checkbox"
//                                                     className="form-check-input" />
//                                                 <label className="form-check-label">
//                                                     <i className="far fa-thumbs-down"></i>
//                                                 </label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <input type="file" onChange={this.addfile} />
//                                 </div>
//                                 <button onClick={(e) => {
//                                     this.onSubmit(e);
//                                     this.createPlace(e)
//                                 }} className="btn btn-primary small mt-4">Create </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
