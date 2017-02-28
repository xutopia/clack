// SearchBar container that accepts user input to be run in the lunr
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { searchMessages } from '../actions/actions';
import generateSearchIndex from '../util/indexMessages';


class SearchBar extends Component {
  handleSearch = (event) => {
    const searchTerm = event.target.value;
    if(event.keyCode === 13 && searchTerm) {
      const messages = this.props.messages.entities;
      const idx = generateSearchIndex(messages);
      this.props.dispatch(searchMessages({ searchTerm, idx }));
    }
  }

  render() {
    return (
      <div>
        Here is the SearchBar
        <Input
          type="text"
          id="input-search"
          placeholder="Search"
          onChange={(event) => this.handleSearch(event)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ search, messages }) => {
  return { search, messages };
}


export default connect(mapStateToProps)(SearchBar);
