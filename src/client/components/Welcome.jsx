// landing splash page with typing animation
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import welcomeMsgs from '../util/welcomeMsgs';

class Welcome extends Component {
  componentWillMount() {
    this.onLoad();
  }
  TxtRotate = (el, toRotate, period) => {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = () => {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    const that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

    setTimeout(() => {
      that.tick();
    }, delta);
  };

  onLoad = () => {
    const elements = ReactDOM.findDOMNode(this.welcome);
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  }

  return (
    <div>
      <h1>Wecome to Clack!</h1>
      <span
        className="txt-rotate"
        data-period="2000"
        data-rotate={welcomeMsgs}
        ref={(el) => { this.welcome = el; }}
      />

      Probably my last component for now
    </div>
  )
}

export default connect()(Welcome);
