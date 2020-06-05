import React, { Component } from 'react';
import { FAKE_CONTACTS } from '../../data';
import '../../styles/profile.css';
import '../../styles/App.css';
import AddContactForm from '../modules/AddContactForm';
import { 
    Button,
    Image,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import GlobalContext from '../../GlobalContext';

export const Card = (props) => {
    return (
        <div className='profile-card'>
            <Image
                size='medium'
                src={props.image}
            />
            <div className='profile-card__content'>
                <h3 className='profile-card__name'>{props.name}</h3>
                <p className='profile-card__meta'>{props.date_met}</p>
                <Link to={`/profile/view`}>
                    <Button circular icon='arrow right' floated='right' className='expand-btn'/>
                </Link>
            </div>
        </div>
    )
}

export default class AllContacts extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
        if (!this.context.user_id) {
            return <Redirect to='/'/>
        }

        const cards = FAKE_CONTACTS.map((contact, i) => (
            <Card
                {...contact}
            />
        ))
        
        return (
            <>
                <div className='contacts'>
                    <h3 className='contacts__title header'>
                        All Contacts
                    </h3>
                    <main className='cards-container'>
                        {cards}
                    </main>
                    <AddContactForm/>
                </div>
            </>
        )
    }
}

