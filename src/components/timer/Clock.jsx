import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    };
  }
  
  startTimer() {
    this.setState({
      timer: 1000*this.props.startTime,
    })
    this.timerId = setInterval(
      () => this.tick(this.state.timer - 5),
      5
    );
  }
  
  stopTimer() {
    clearInterval(this.timerId);
  }
  
  pauseTimer() {
    this.stopTimer();
  }
  
  resumeTimer() {
    this.timerId = setInterval(
      () => this.tick(this.state.timer - 5),
      5
    );
  }
  
  tick(a) {
    if (this.state.timer === 0) {
      this.stopTimer();
    }
    else {
      this.setState({
        timer: a,
      });
    }
  }
  
  render() {
    let time = (this.props.isToggle === 0) ? this.props.startTime : Math.ceil(this.state.timer/1000);
    let hours = Math.floor(time/ 3600) + 'h';
    let minutes = Math.floor(time % 3600 / 60) + 'm';
    let seconds = time% 3600 % 60 + 's';

    return (
      <div className="clock">
        <h2>
          {hours}
        </h2>
        <h2>
          {minutes}
        </h2>
        <h2>
          {seconds}
        </h2>
      </div>
    );
    }
}

export default Clock;