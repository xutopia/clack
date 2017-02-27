import React from 'react';
import { connect } from 'react-redux';
import { Feed, Icon } from 'semantic-ui-react';
import { addReaction } from '../actions/actions';

class Reactions extends React.Component {

  addLikes = (event) => {
    const reactionCount = this.props
    this.props.dispatch(addReaction({ reactions }))//need to define where this is going in the sagas
  }

  render () {
    //define reaction object with a like property and its count
    const reactionCount = 2//m.likeCount;
    return (
      <Feed.Like>
        <Icon name='like' onClick={this.addLikes}/>
        {reactionCount} likes
      </Feed.Like>
    )
  }
}


const mapStateToProps = ({ messages, myP }) => {
  return { messages };
}

export default connect(mapStateToProps)(Reactions)
