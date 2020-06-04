import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import Home from './components/pages/Home';
import AllContacts from './components/pages/AllContacts';
import Profile from './components/pages/Profile';
import './styles/App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home}/>
        <Route path='/all' component={AllContacts}/>
        <Route path='/profile/:id' component={Profile}/>
      </Router>
    );
  }
}

export default App;
