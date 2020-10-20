import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Posts from './Posts';
import NewPost from './NewPost';

export default class Routing extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/new" component={NewPost}/>
                    <Route path="/" component={Posts} />
                    <Route render={() => <h1>Page Not Found</h1>}/>
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        )
    }
}
