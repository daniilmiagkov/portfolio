import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }
  
  handleChange(e) {
    this.setState({temperature: e.target.value});
  }
}

export default Calculator;