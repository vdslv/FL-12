import React, {Component} from "react";
import {Link} from "react-router-dom";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            duration: '',
            authors: '',
            date: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addPost(this.state);
        this.setState({
            title: '',
            description: '',
            duration: '',
            authors: '',
            date: ''
        });
    };

    render() {
        return (
            <div id='add-edit-form'>
                <h2>Course</h2>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Title:</label>
                        <br/>
                        <input type="text" value={this.state.title} onChange={this.onChange} name='title' required/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <br/>
                        <textarea value={this.state.description} onChange={this.onChange} name='description' required/>
                    </div>
                    <div>
                        <label>Duration:</label>
                        <br/>
                        <input type="text" value={this.state.duration} onChange={this.onChange} name='duration'
                               required/>
                    </div>
                    <div>
                        <label>Authors:</label>
                        <br/>
                        <input type="text" value={this.state.authors} onChange={this.onChange} name='authors' required/>
                    </div>
                    <div>
                        <label>Date:</label>
                        <br/>
                        <input type="text" value={this.state.date} onChange={this.onChange} name='date' required/>
                    </div>
                    <div>
                        <button onClick={this.onSubmit} type='submit'><Link to='/'>Submit</Link></button>
                        <Link to='/'>
                            <button type='button'>Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default PostForm