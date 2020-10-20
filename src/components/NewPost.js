import React, { Component } from 'react';
import axios from '../axios';

export default class NewPost extends Component {

    
constructor(props) {
    super(props);
    this.state = {
        posts: this.props.location.posts ,
        id: 0,
        title: '',
        body: ''
    }
}

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = async e => {
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
        return (
            <div className="container">
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
