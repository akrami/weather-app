import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
      current: 0,
      searchModal : false,
      search: '',
      searchTimeout: 0,
      searchResult: [],
      searchLoading: false
    }

    this.setCurrent = this.setCurrent.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
  }

  setCurrent(id) {
    this.setState({ current: id });
  }

  changeSearch(event) {
    if (this.state.searchTimeout) clearTimeout(this.state.searchTimeout);
    this.setState({ search: event.target.value, searchResult: [] });
    if (event.target.value.length >= 3) this.setState({
      searchLoading: true,
      searchTimeout: setTimeout(() => {
        fetch(`https://www.metaweather.com/api/location/search/?query=${this.state.search}`)
          .then(result => result.json())
          .then(result => { this.setState({ searchLoading: false, searchResult: result.filter((each, index) => index < 3) }) });
      }, 500)
    })
  }

  render() {
    return (
      <div className="App">
        <div id="background" className={this.state.cities[this.state.current].w}><CrossfadeImage timingFunction={"ease-out"} style={{ height: '100%', maxHeight: 'none', maxWidth: 'none' }} src={"/images/" + this.state.cities[this.state.current].w + ".jpg"} /></div>
        <div className="weather-status">
          <h1 className="weatherDegreeWrapper"><TextTransition text={this.state.cities[this.state.current].name} springConfig={presets.molasses} className="weatherCity" /></h1>
          <h2 className="weatherDegree"><CountUp end={this.state.cities[this.state.current].d} />°C</h2>
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
          <button className="add" onClick={()=>this.setState({searchModal: true})}><FontAwesomeIcon icon={faPlusCircle} className="header" /></button>
          <div className="gutter">&nbsp;</div>
        </div>

        <div className={this.state.searchModal?'addModal':'addModal hidden'} onClick={event=>{event.stopPropagation();this.setState({searchModal: false});}}>
          <div>
            <input className="cityName" type="text" value={this.state.search} onChange={this.changeSearch} />
            <ul id="searchList">
              {this.state.searchLoading?<FontAwesomeIcon icon={faSpinner} spin />:this.state.searchResult.map(each => <li key={each.woeid}>{each.title}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
