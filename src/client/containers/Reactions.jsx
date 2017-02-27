import React from 'react';
import { connect } from 'react-redux';
import { Feed, Icon } from 'semantic-ui-react';

class Reactions extends React.Component {

  addLikes = (event) => {
    console.log('this is the event: ', event);
    this.props.dispatch(addReaction({ reaction }))
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


const mapStateToProps = ({ messages }) => {
  return { messages };
}

export default connect(mapStateToProps)(Reactions)
