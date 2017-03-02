import React from 'react';
import { connect } from 'react-redux';
import { Feed, Icon } from 'semantic-ui-react';
import { addReaction } from '../actions/actions';

class Reactions extends React.Component {

  addLikes = (event) => {
    const feedId = this.props.eventKey;
    const likedMessage = this.props.messages.entities[feedId];
    this.props.dispatch(addReaction({ likedMessage }))
  }

  render () {
    const { messages } = this.props;
    const feedId = this.props.eventKey;
    const currentMessage = this.props.messages.entities[feedId];
    const reactionCount = currentMessage.reactions.likes;
    let likePhrase = '';
    if (reactionCount > 1) {
      likePhrase = reactionCount + ' likes';
    } else if (reactionCount === 1) {
      likePhrase = reactionCount + ' like';
      }

    return (
      <Feed.Like>
        <Icon name='like' onClick={this.addLikes}/>
        {likePhrase}
      </Feed.Like>
    )
  }
}



const mapStateToProps = ({ messages }) => {
  return { messages };
}

export default connect(mapStateToProps)(Reactions)
