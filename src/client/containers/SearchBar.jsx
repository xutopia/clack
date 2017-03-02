// SearchBar container that accepts user input to be run in the lunr
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { searchMessages } from '../actions/actions';
import generateSearchIndex from '../util/indexMessages';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  onSearchSubmit = (event) => {
    const searchTerm = this.state.value;
    const messages = this.props.messages.entities;
    const idx = generateSearchIndex(messages);
    this.props.dispatch(searchMessages({ searchTerm, idx }));
    event.preventDefault();
  }
  handleSearching = (event) => {
    const value = event.target.value;
    this.setState({ value });
  }

  render() {
    return (
      <div>
        Here is the SearchBar
        <form onSubmit={(e) => this.onSearchSubmit(e)}>
          <Input
            type="text"
            id="input-search"
            placeholder="Search"
            value={this.state.value}
            onChange={(event) => this.handleSearching(event)}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ search, messages }) => {
  return { search, messages };
}


export default connect(mapStateToProps)(SearchBar);
