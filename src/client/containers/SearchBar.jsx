// SearchBar container that accepts user input to be run in the lunr
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchMessages } from '../actions/actions';
import generateSearchScore from '../util/indexMessages';


class SearchBar extends Component {
  handleSearch = (event) => {
    const searchTerm = event.target.value;
    if(event.keyCode === 13 && searchTerm) {
      const messages = this.props.messages.entities;
      const idx = generateSearchScore(messages);
      this.props.dispatch(searchMessages({ searchTerm, idx }));
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

function mapStateToProps({ search, messages }) {
  return { search, messages };
}

export default connect(mapStateToProps)(SearchBar);
