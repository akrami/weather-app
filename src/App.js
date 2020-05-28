import React from 'react';
import './App.css';

class App extends React.Component {
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
        <h1>{this.state.cities[this.state.current].name}</h1>
        <h2>{this.state.cities[this.state.current].d}°C</h2>
        <h3>{this.state.cities[this.state.current].w}</h3>

        <div id="cities">
          {this.state.cities.map((each, index) => {
            return (
              <button key={each.woeid} onClick={() => this.setCurrent(index)} display="inline">
                <h3>{each.name}</h3>
                <h5>{each.d}°C</h5>
              </button>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
