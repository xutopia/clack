import React from 'react'
import Landing from './Landing'
import Room from './Room'

// APP will dynamicall render its children (this.props.children)
// either LandingPage or Room

const App = (props) => {
    return (
      <div>
        <Landing />
        HELLO
        <Room />
      </div>
    )
}

export default App
