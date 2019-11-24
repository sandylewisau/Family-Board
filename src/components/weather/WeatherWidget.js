import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import fetch from 'fetch';
var convert = require('xml-js');

const kelvinToCelsius = require('kelvin-to-celsius');

class WeatherWidget extends Component {

  state = {
    currentWeather: [],
    forecast: [],
    today: [],
    todayText: '',
    tomorrow: [],
    tomorrowText: ''
  }

  componentDidMount() {
    // axios.get('http://api.openweathermap.org/data/2.5/weather?q=Sydney,AU&appid=e268974dfb3c725bac3603facacfba3a')
    //   .then(response => {
    //     this.setState({
    //       currentWeather: [response.data]
    //     })
    //     console.log(response);
    //   });

    axios.get('http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94767.json')
      .then(response => {
        this.setState({
          currentWeather: [response.data.observations]
        })
        console.log(response.data.observations);
      });

    // axios({
    //   method: 'get',
    //   url: 'ftp://ftp.bom.gov.au/anon/gen/fwo/IDN11050.xml',
    //   responseType: 'text'
    // })
    // .then(response => {
    //   // this.setState({
    //   //   currentWeather: [response.data.observations]
    //   // })
    //   console.log('response', response);
    // });

    // fetch('ftp://ftp.bom.gov.au/anon/gen/fwo/IDN11050.xml').then((results) => {
    //   // results returns XML. Cast this to a string, then create
    //   // a new DOM object out of it! like this
    //   results
    //     .text()
    //     .then(( str ) => {
    //       let testy = convert.xml2json(str, {compact: true, spaces: 4})

    //       let forecast = [JSON.parse(testy)][0].product.forecast.area.filter(x => {
    //         return x._attributes.aac === 'NSW_ME001';
    //       })[0]["forecast-period"];
    //       this.setState({
    //         currentWeather: [forecast]
    //       })
    //       console.log('testy2', forecast);
    //      }
    //   );   
    // })

    // fetch('ftp://ftp.bom.gov.au/anon/gen/fwo/IDN11050.xml').then((results) => {
    //   // results returns XML. Cast this to a string, then create
    //   // a new DOM object out of it! like this
    //   results
    //     .text()
    //     .then(( str ) => {
    //       let testy = convert.xml2json(str, {compact: true, spaces: 4})

    //       let forecast = [JSON.parse(testy)][0].product.forecast.area.filter(x => {
    //         return x._attributes.aac === 'NSW_ME001';
    //       })[0]["forecast-period"];

    //       let today = forecast[0];
    //       let tomorrow = forecast[1];

    //       let todayText = today.text[0]._text;
    //       let tomorrowText = tomorrow.text._text;

    //       this.setState({
    //         today: [today],
    //         todayText: todayText,
    //         tomorrow: [tomorrow],
    //         tomorrowText: tomorrowText
    //       })
    //       console.log('testy2', forecast);
    //      }
    //   );   
    // })
  }

  render() {
    const { currentWeather, today, tomorrow, todayText, tomorrowText } = this.state;
    const recList = currentWeather.length ? (
      currentWeather.map(rec => {
        return (
          <div key={rec.index}>
            <div className="card-body">
              <h4 className="card-title">
              </h4>
              <div className="card-content">
                <h3>Today</h3>
                <div>
                  {today[0].text.map(x => {
                    return <p key={x._attributes.type}>{x._attributes.type.toUpperCase().replace('_', ' ')} - {x._text}</p>;
                  })}
                </div>
                <h3>Tomorrow</h3>
                <p>{tomorrowText}</p>
              </div>
            </div>
          </div>

        )
      })
    ) : (
        <div className="center">No currentWeather yet</div>
      );
    return (
      <div className="card h-100">
        {recList}
      </div>
    )
  }

}

export default WeatherWidget;



{/* <div className="emoji-card-top display-4 text-center card-img-top">
  {
    rec.weather.map(data => {
      return <img className="weatherIcon" src={"http://openweathermap.org/img/w/" + data.icon + ".png"} alt="" />
    })
  }
  <span className="pull-right">{Math.round(kelvinToCelsius(rec.main.temp))}°</span>
</div>
<div className="card-body">
  <h4 className="card-title">
    <div>{rec.name}</div>
  </h4>
  <div className="card-content">
    <p>{Math.round(kelvinToCelsius(rec.main.temp_min))}° - {Math.round(kelvinToCelsius(rec.main.temp_max))}°</p>
  </div>
</div> */}
