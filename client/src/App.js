import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  async componentDidMount() {
    /*
    Purely for testing if server hooked up properly
    with front end react app
    */
    const data = await fetch('/api/test')
      .then((res) => {
        if (!res.ok) {
          throw `API request failed with ${res.status} and text: ${res.statusText}`;
        }
        return res
          .clone()
          .json()
          .catch((error) => {
            return res.text().then((text) => {
              throw `API request's results cannot be converted to a JSON object \n${text} `
            })
          })
      })
    console.log(data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hmmm <code>src/App.js</code> and save to reload.
          </p>
          <p>{window.token}</p>
        </header>
      </div>
    );
  }
}

export default App;
