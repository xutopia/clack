// landing splash page with typing animation
import React from 'react';
import { connect } from 'react-redux';
import welcomeMsgs from '../util/welcomeMsgs';

const Welcome = () => {
  return (
    <div>
      <h1>Wecome to Clack!</h1>
      <span
        class="txt-rotate"
        data-period="2000"
        data-rotate={welcomeMsgs}
      Probably my last component for now
    </div>
  )
}

export default connect()(Welcome);
