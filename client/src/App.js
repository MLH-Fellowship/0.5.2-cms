import React, { Component } from 'react';
import { get } from './utilities';
import AllContacts from './AllContacts';

class App extends Component {
  async componentDidMount() {
    /*
    Purely for testing if server hooked up properly
    with front end react app
    */
    const data = await get('/api/test');
    console.log(data);
  }
  render() {
    return (
      <div>
        <AllContacts/>
      </div>
    );
  }
}

export default App;
