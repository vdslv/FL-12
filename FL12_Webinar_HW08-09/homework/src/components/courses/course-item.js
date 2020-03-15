import React, {Component} from "react";
import PropTypes from 'prop-types';
import Item from './item';

class CreatePost extends Component {
    render() {
        return this.props.posts.map((post, i) => (
                <Item key={i} post={post} i={i} delPost={this.props.delPost} editPost={this.props.editPost}/>
            )
        )
    }
}

CreatePost.propTypes = {
    posts: PropTypes.array.isRequired
};

export default CreatePost;