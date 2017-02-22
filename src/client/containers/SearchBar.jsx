// SearchBar container that accepts user input to be run in the lunr
import React, { Component }from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
  render() {
    return (
      <div>
        Here is the SearchBar
      </div>
    );
  }
}

export default connect()(SearchBar);
