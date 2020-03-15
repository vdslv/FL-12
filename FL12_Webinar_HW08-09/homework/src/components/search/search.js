import React from "react";

class SearchInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Ім\'я, що було надіслано: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <div id='search-input'>
                <input id='searcher' type='text' placeholder='Search' value={this.state.value} onChange={this.handleChange}/>
            </div>
        )
    }
}

export default SearchInput;