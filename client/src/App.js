import React, { Component } from 'react';
import AllContacts from './components/pages/AllContacts';
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import Home from './components/pages/Home';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home}/>
        <Route path='/all' component={AllContacts}/>
      </Router>
    );
  }
}

export default App;
