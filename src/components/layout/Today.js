import React, {Component} from 'react';
import moment from 'moment'

class Today extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date()
    });
  }

  render() {
    return (
      <h2>{moment(this.state.time).locale('en-au').format('D MMM - LTS')}</h2>
    );
  }
} 

export default Today;
