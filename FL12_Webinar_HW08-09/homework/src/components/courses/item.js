import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Item extends Component {
    render() {
        const {date, title, description, authors} = this.props.post;
        return (
            <div className='course-item' id={this.props.i}>
                <span>{date}</span>
                <span>{title}</span>
                <span>{description}</span>
                <span>{authors}</span>
                <div className='dropdown-container'>
                    <div className='dropdown-trigger'>
                        <button>...</button>
                        <button onClick={this.props.delPost.bind(this, this.props.i)} style={btnStyle}>x</button>
                        <Link to='/editPost'>
                            <button onClick={this.props.editPost.bind(this, this.props.i)} style={btnStyle}>Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    post: PropTypes.object.isRequired
};

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 11px',
    borderRadius: '50%',
    cursor: 'pointer'
};

export default Item;