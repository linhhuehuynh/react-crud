import React, { Component } from 'react'
import Table from './Table';
import axios from '../axios';
import UpdatePost from './UpdatePost';
import {NavLink} from 'react-router-dom';
import './Posts.css'

export default class Posts extends Component {
    
    state = {
        posts: [],
        id: 0,
        title: '',
        body: '',
        updateClicked: false,
        cancel: false
    }

    async componentDidMount(){
        await axios.get('/posts?_limit=5')
        .then(response => {
            response.data.forEach(post => post.updateClicked = false)
            this.setState({posts: response.data})
        })
    }



    updatePost = e => {
        let index = this.state.posts.findIndex(p => p.id === e.id);
        const post = {...this.state.posts[index]}
        const posts = [...this.state.posts]
        posts[index] = post;
        let updateClicked = this.state.updateClicked

        this.setState({
            id: post.id,
            title: post.title,
            body: post.body,
            updateClicked: !updateClicked
        })
    }

    handleTitle = e => {
        this.setState({
            title: e.target.value
        })
    }

    handleBody = e => {
        this.setState({
            body: e.target.value
        })
    }

    handleSubmitUpdate = async e => {
        e.preventDefault();
        
        let id = this.state.id
        let index = id - 1;

        const post = {...this.state.posts[index]};
        post.title = this.state.title;
        post.body = this.state.body
        const posts = [...this.state.posts];
        posts[index] = post

        let updateClicked = this.state.updateClicked

        this.setState({
            posts,
            updateClicked: !updateClicked
        })

        await axios.put(`/posts/${id}`, post)
                    .then(this.props.history.replace('/posts', posts))
    }

    handleCancel = () => {
        this.setState({
            updateClicked: !this.state.updateClicked
        })
    }
    

    deletePost = async post => {
        const posts = this.state.posts.filter(p => p.id !== post.id)
        this.setState({posts})

        await axios.delete(`/posts/${post.id}`)
                    .then(this.props.history.replace('/posts', posts));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.state!==undefined && this.props.location.state !== this.state.posts) {
          this.setState({posts: this.props.location.state});
        }
      }

    render() {
        return (
            <div className="container">
                <button className='button'>
                    <NavLink className='buttontext'
                    to ={{ pathname: '/new',
                           hash: '#submit',
                           search: '?quick-submit=true',
                           posts: this.state.posts}}>New Post
                            
                    </NavLink>
                </button>
                
                <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.posts.map((post, index) => {
                        return <Table  id={post.id}
                                title={post.title}
                                body={post.body}
                                key={post.id}


                                onUpdate={() =>this.updatePost(post)}
                                onDelete={() => this.deletePost(post)}/>
                    })}
                </tbody>
                </table>
                
                <UpdatePost
                id={this.state.id}
                title={this.state.title}
                body={this.state.body}
                handleTitle={this.handleTitle}
                handleBody={this.handleBody}
                handleSubmit={this.handleSubmitUpdate}
                handleCancel={this.handleCancel}
                updateClicked={this.state.updateClicked}
                />
                
            </div>
        )
    }
}
