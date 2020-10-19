import React, { Component } from 'react'
import NewPost from './NewPost';
import Table from './Table';
import axios from 'axios';
import UpdatePost from './UpdatePost';

export default class Posts extends Component {
    
    state = {
        posts: [],
        id: 0,
        title: '',
        body: '',
        createClicked: false,
        updateClicked: false
    }

    async componentDidMount(){
        await axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(response => {
            response.data.forEach(post => post.updateClicked = false)
            this.setState({posts: response.data})
        })
    }

    createPost = () => {
        let createClicked = this.state.createClicked
        this.setState({
            createClicked: !createClicked
        })
    }

    handleChangeCreate = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmitCreate = async e => {
        e.preventDefault();
        const currentPosts = this.state.posts;
        const last = currentPosts[currentPosts.length-1]
        let id = last.id + 1;
        const post = {
            id,
            title: this.state.title,
            body: this.state.body
        }

        await axios.post('http://jsonplaceholder.typicode.com/posts', post)
        const posts = [...this.state.posts, post];
        this.setState({posts})
    }

    updatePost = e => {
        let index = this.state.posts.findIndex(p => p.id === e.id);
        const post = {...this.state.posts[index]}
        const posts = [...this.state.posts]
        posts[index] = post;
        let updateClicked = this.state.updateClicked

        this.setState({
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

    handleSubmitUpdate = e => {
        console.log('submit')
        // await axios.put(`http://jsonplaceholder.typicode.com/posts/${post.id}`, post)

        // const posts = [...this.state.posts];
        // post.title = this.state.title;
        // post.body = this.state.body;
        // const index = posts.indexOf(post);
        // posts[index] = {...post};
        // this.setState({
        //     posts,
        // })
    }

    

    deletePost = async post => {
        await axios.delete(`http://jsonplaceholder.typicode.com/posts/${post.id}`);
        const posts = this.state.posts.filter(p => p.id !== post.id)
        this.setState({posts})
    }



    render() {
        return (
            <div>
                <NewPost 
                        handleChange={this.handleChangeCreate}
                        handleSubmit={this.handleSubmitCreate}
                        onCreate={this.createPost}
                        createClicked={this.state.createClicked}/>

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
                            updateClicked={this.state.updateClicked}
                />
            </div>
        )
    }
}
