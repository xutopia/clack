import React from 'react'
import Landing from './Landing'


// APP will dynamicall render its children (this.props.children)
// either LandingPage or Room

const App = (props) => {
    return (
      <div>
        <Landing />
        <div className="container">
        </div>
      </div>
    )
}

export default App
