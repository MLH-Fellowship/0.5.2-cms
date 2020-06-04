import React, { Component } from 'react';
import { 
    Icon, 
    Popup,
    Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../styles/navbar.css';

export default class Navbar extends Component {
    render() {
        const { activeItem } = this.props;
        return (
            <div className='navbar'>
                <Link to='/all'>
                    <p className={`navbar__item ${activeItem === 'all' ? 'active' : ''}`}>
                        All Connections
                    </p>
                </Link>
                <Link to='/groups'>
                    <p className={`navbar__item ${activeItem === 'groups' ? 'active' : ''}`}>
                        Contact Book
                    </p>
                </Link>
                <Popup trigger={<Icon name='user circle' size='massive'/>} flowing hoverable position='top right'>
                    <Button
                        className='navbar__item'
                        content='Logout'
                    />
                </Popup>                        
            </div>
        )
    }
}