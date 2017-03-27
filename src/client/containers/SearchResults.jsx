// search results container with interactive options
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import SearchResultsItem from '../components/SearchResultsItem.jsx';
import orderDescendingMessages from '../util/orderDescendingMessages';

class SearchResults extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.messages === nextProps.messages;
  }
  render() {
    const resultsText = {
      width: '20%',
      margin: '0 auto'
    }

    const listText = {
      width: '75%',
      margin: '20px auto'
    }

    const searchResultsList = orderDescendingMessages(this.props.messages, this.props.search.resultScores);
    const messagesList = searchResultsList.map((result, i) =>
      <div key={`${i}:${result.id}`}><b>{result.username}: </b>{result.text}</div>
    )
    return (
      <div>
        {messagesList}
      </div>
    )
  }
}

const mapStateToProps = ({ search, messages }) => {
  return { search, messages }
};


export default connect(mapStateToProps)(SearchResults);
