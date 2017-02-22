// SearchBar container that accepts user input to be run in the lunr
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchTerm } from '../actions/actions'

class SearchBar extends Component {
  handleSearch = (event) => {
    const searchTerm = event.target.value;
    if(event.keyCode === 13 && searchTerm) {
      this.props.dispatch(searchMessages({ searchTerm }));
    }
  }

  render() {
    return (
      <div>
        Here is the SearchBar
        <input
          type="text"
          id="input-search"
          placeholder="Search"
          onKeyUp={this.handleSearch}
        />
      </div>
    );
  }
}

export default connect()(SearchBar);
