// search results container with interactive options
import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResultsItem from '../components/SearchResultsItem.jsx';
import orderDescendingMessages from '../util/orderDescendingMessages';

class SearchResults extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.messages === nextProps.messages;
  }
  render() {
    const searchResultsList = orderDescendingMessages(this.props.messages, this.props.search.resultScores);
    const messagesList = searchResultsList.map((result, i) =>
      <li key={`${i}:${result.id}`}><b>{result.username}: </b>{result.text}</li>
    )
    return (
      <div>
        HERE ARE ALL THE SEARCH RESULTS!!
        {messagesList}
      </div>
    )
  }
}

const mapStateToProps = ({ search, messages }) => {
  return { search, messages }
};


export default connect(mapStateToProps)(SearchResults);
