// landing splash page with typing animation
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { welcomeMsgs, RotateTxt } from '../util/welcomeMsgs';

class Welcome extends Component {
  componentDidMount() {
    this.onLoad();
  }

  onLoad = () => {
    const elements = ReactDOM.findDOMNode(this.welcome);
    console.log('here is the elements,', elements)
    for (let i = 0; i < 1; i++) {
      const toRotate = elements.getAttribute('data-rotate');
      const period = elements.getAttribute('data-period');
      if (toRotate) {
        new RotateTxt(elements, toRotate, period);
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Wecome to Clack!</h1>
        <div
          className="txt-rotate"
          data-period="2000"
          data-rotate={welcomeMsgs}
          ref={(el) => { this.welcome = el; }}
        >

        </div>

        Probably my last component for now
      </div>
    )
  }
}

export default connect()(Welcome);
