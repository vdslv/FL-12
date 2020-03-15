import React, {Component} from "react";
import './course.css';
import CreatePost from "./course-item";
import PostForm from "../addCourse";
import SearchInput from "../search/search";
import Btn from "../search/addCourse";
import {BrowserRouter as Router, Route} from 'react-router-dom';

class Courses extends Component {
    state = {
        posts: [
            {title: 'DEV', authors: 'dsa', duration: 'asd', date: '123', description: 'tratatata', open: false},
            {title: 'MOVIE', authors: 'dsa', duration: 'asd', date: '123', description: 'tratatata', open: false}
        ]
    };

    delPost = (i) => {
        console.log(i);
        this.setState({posts: [...this.state.posts.filter(post => this.state.posts.indexOf(post) !== i)]});
    };

    editPost = (i) => {
        console.log(this.state.posts[i]);
        // this.setState({posts: [...this.state.posts, currPost]});
    };

    addPost = (state) => {
        const {title, description, authors, date, duration} = state;
        const newPost = {
            title, description, authors, date, duration
        };
        this.setState({posts: [...this.state.posts, newPost]})
    };

    render() {
        return (
            <Router>
                <div>
                    <Route path='/addPost'>
                        <PostForm addPost={this.addPost}/>
                    </Route>
                    <Route path='/editPost'>
                        <PostForm editPost={this.editPost}/>
                    </Route>
                    <Route exact path='/'>
                        <div id='search-btn'>
                            <SearchInput/>
                            <Btn/>
                        </div>
                        <div className='course'>
                            <CreatePost posts={this.state.posts} delPost={this.delPost} editPost={this.editPost}/>
                        </div>
                    </Route>
                </div>
            </Router>
        )
    }
}

export default Courses;