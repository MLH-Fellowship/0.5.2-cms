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

export class Card extends Component {
    static contextType = GlobalContext
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/profile/view'/>
        }
        const { contact } = this.props;
        return (
            <div className='profile-card'>
                <Image
                    size='medium'
                    src={contact.image}
                />
                <div className='profile-card__content'>
                    <h3 className='profile-card__name'>{contact.name}</h3>
                    <p className='profile-card__meta'>{contact.date}</p>
                    <Button 
                        circular 
                        icon='arrow right' 
                        floated='right' 
                        className='expand-btn'
                        onClick={() => { 
                            this.setState({ redirect: true }); 
                            this.context.setViewedProfile(contact)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default class AllContacts extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    placeHolderProfiles = (num) => {
        const cards = [];
        for(let i = 0; i < num; i++) {
            cards.push(<div className='profile-card placeholder'></div>);
        }
        return cards;
    }
    
    render() {
        if (!this.context.user_id) {
            return <Redirect to='/'/>
        }

        if (this.state.redirect) {
            return <Redirect to='/profile/view'/>
        }
        const cards = this.context.contacts.map((contact, i) => (
            <Card
                redirect={() => this.setState({ redirect: true })}
                contact={contact}
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
                        {this.placeHolderProfiles(this.context.contacts.length > 5 ? 0 : 5 - this.context.contacts.length)}
                    </main>
                    <AddContactForm/>
                </div>
            </>
        )
    }
}

