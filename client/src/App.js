import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom';
import Home from './components/pages/Home';
import AllContacts from './components/pages/AllContacts';
import Profile from './components/pages/Profile';
import ContactBook from './components/pages/ContactBook';
import GroupPage from './components/pages/GroupPage';
import Navbar from './components/modules/Navbar';
import './styles/App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/all'>
          <Navbar activeItem='all'/>
          <AllContacts/>
        </Route>
        <Route exact path='/groups'>
          <Navbar activeItem='groups'/>
          <ContactBook/>
        </Route>
        <Route path='/groups/view'>
          <Navbar/>
          <GroupPage/>
        </Route>
        <Route path='/profile/view'>
          <Navbar/>
          <Profile/>
        </Route>
      </Router>
    );
  }
}

export default App;
