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
      <h3>{moment(this.state.time).locale('en-au').format('D MMM - LTS')}</h3>
    );
  }
} 

export default Today;
