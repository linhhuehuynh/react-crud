import React, { Component } from 'react';
import axios from '../axios';
import { Redirect } from 'react-router-dom';

export default class NewPost extends Component {

    
constructor(props) {
    super(props);
    this.state = {
        posts: this.props.location.posts ,
        id: 0,
        title: '',
        body: '',
        submitted: false
    }
}

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async e => {
        e.preventDefault();
        const currentPosts = this.state.posts;
        const last = currentPosts[currentPosts.length-1]
        let id = last.id + 1;
        const post = {
            id,
            title: this.state.title,
            body: this.state.body
        }

        const posts = [...this.state.posts, post];
        this.setState({
            posts
        })

        await axios.post('/posts', post)
                    .then(res => {
                        console.log(res);
                        this.props.history.replace('/posts', posts)
                    })
    }

    render() {
        // let redirect = null;
        // if (this.state.submitted) {
        //     redirect = <Redirect to="/posts" />;
        // }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                        <label>Title</label><br></br>
                        <input type="text" id="title" name="title" onChange={this.handleChange}/><br></br>
                        <label>Body</label><br></br>
                        <textarea name="body" rows="5" cols="30" onChange={this.handleChange}></textarea><br></br>
                        <input type="submit"/>
                </form>
            </div>
        )
    }
}
