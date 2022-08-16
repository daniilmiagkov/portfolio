import React from 'react';
import Input from "../common/Input/Input";

class InputTime extends React.Component{
  constructor(props) {
    super(props);
    this.handleSecondsChange = this.handleSecondsChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.state = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      sum: 0,
    }
  }
  
  resetTimer = () => {
    this.setState({
      seconds: 0,
      hours: 0,
      minutes: 0,
    })
  };
  
  handleSecondsChange(e) {
    if (!Number.isNaN(+e)) {
      this.props.onChange(this.state.hours * 3600 + this.state.minutes * 60 + +e);
      this.setState({
        seconds: +e,
      });
    }
  }
  
  handleMinutesChange(e) {
    if (!Number.isNaN(+e)) {
      this.props.onChange(this.state.hours * 3600 + +e * 60 + this.state.seconds);
      this.setState({
        minutes: +e,
      });
    }
  }
  
  handleHoursChange(e) {
    if (!Number.isNaN(+e)) {
      this.props.onChange(+e * 3600 + +this.state.minutes * 60 + this.state.seconds);
      this.setState({
        hours: +e,
      });
    }
  }
  
  check = a => (a !== 0) ? a : '';

  render () {
    
    return (
      <div className="inputTime">
        <Input
          classChild='inputTimer'
          value={this.check(this.state.hours)}
          onChange={this.handleHoursChange} />
        <Input
          classChild='inputTimer'
          value={this.check(this.state.minutes)}
          onChange={this.handleMinutesChange} />
        <Input
          classChild='inputTimer'
          value={this.check(this.state.seconds)}
          onChange={this.handleSecondsChange} />
      </div>
    );
  }
};

export default InputTime;