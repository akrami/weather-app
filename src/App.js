import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import TextTransition, { presets } from "react-text-transition";
import CrossfadeImage from "react-crossfade-image";

class App extends React.Component {
  weathers = {
    'sn': 'Snow',
    'sl': 'Sleet',
    'h': 'Hail',
    't': 'Thunderstorm',
    'hr': 'Heavy Rain',
    'lr': 'Light Rain',
    's': 'Showers',
    'hc': 'Heavy Cloud',
    'lc': 'Light Cloud',
    'c': 'Clear',
  }

  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: 'Tehrān', woeid: 2251945, d: 35, w: 'c' },
        { name: 'San Francisco', woeid: 2487956, d: 22, w: 'hc' },
        { name: 'London', woeid: 44418, d: 12, w: 'lc' },
        { name: 'Munich', woeid: 676757, d: -2, w: 'sn' }
      ],
      current: 0
    }
  }

  setCurrent(id) {
    this.setState({ current: id });
  }

  render() {
    return (
      <div className="App">
        <div id="background" className={this.state.cities[this.state.current].w}><CrossfadeImage timingFunction={"ease-out"} style={{height: '100%', maxHeight: 'none', maxWidth: 'none'}} src={"/images/"+this.state.cities[this.state.current].w+".jpg"} /></div>
        <div className="weather-status">
          {/* <h1>{this.state.cities[this.state.current].name}</h1> */}
          {/* <h2>{this.state.cities[this.state.current].d}°C</h2> */}
          <h1><TextTransition text={this.state.cities[this.state.current].name} springConfig={presets.molasses} className="weatherCity" /></h1>
          <h2 className="weatherDegree"><CountUp end={this.state.cities[this.state.current].d} />°C</h2>
          {/* <h3>{this.weathers[this.state.cities[this.state.current].w]}</h3> */}
        </div>

        <div id="cities">
          {this.state.cities.map((each, index) => {
            return (
              <button key={each.woeid} className={each.w} onClick={() => this.setCurrent(index)}>
                <span className="header">{each.name}</span>
                <span className="secondary">{each.d}°C</span>
              </button>
            )
          })}
          <button className="add"><FontAwesomeIcon icon={faPlusCircle} className="header" /></button>
          <div className="gutter">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default App;
