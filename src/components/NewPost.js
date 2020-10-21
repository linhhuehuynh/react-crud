import React, { Component } from 'react';
import axios from '../axios';

export default class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.location.posts ,
            id: 0,
            title: '',
            body: '',
            cancel: false
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        e.preventDefault();
        const currentPosts = this.state.posts;
        let id = null;
        if (currentPosts.length === 0) { id = 1};
        if (currentPosts.length !== 0 ) {
            const last = currentPosts[currentPosts.length-1]
            id = last.id + 1;
            }

        const post = {
            id,
            title: this.state.title,
            body: this.state.body
        }

        const posts = [...this.state.posts, post];
        this.setState({posts})

        axios.post('/posts', post)
             .then(res => {
                console.log(res);
                this.props.history.replace('/posts', posts)
            })
    }

    handleCancel = () => {
        let posts = [...this.state.posts]
        this.props.history.replace('/posts', posts)
    }

    render() {
       
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                        <h3>CREATE A NEW POST</h3>
                        <label>Title</label><br></br>
                        <input className="textbox" type="text" id="title" name="title" onChange={this.handleChange}/><br></br>
                        <label>Body</label><br></br>
                        <textarea className="textbox" name="body" rows="5" cols="30" onChange={this.handleChange}></textarea><br></br>
                        <input className="button buttontext" type="submit"/>
                        <input onClick={this.handleCancel} className="button buttontext" style={{marginLeft: '1rem'}}value="Cancel" type="button"/>                    
                </form>
            </div>
        )
    }
}
