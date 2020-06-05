import React, { Component } from 'react';
import { FAKE_GROUPS } from '../../data';
import { 
    Grid,
} from 'semantic-ui-react';
import { Card } from './AllContacts';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../../GlobalContext';

export default class GroupPage extends Component {
    static contextType = GlobalContext

    render() {
        if (!this.context.user_id) {
            return <Redirect to='/'/>
        }

        const cards = FAKE_GROUPS[0].contacts.map((contact) => (
            <Card
                className='profile-card'
                id={contact.id}
                name={contact.name}
                image={contact.image}
                date_met={contact.date_met}
            />
        ))

        return (
        <>
            <div 
                className={`group-img ${FAKE_GROUPS[0].region}`}
                ></div>
            <Grid stackable stretched>
                <Grid.Row className='group__info-row'>
                    <Grid.Column floated='right' width={12}>
                        <div className='group__info'>
                            <h3 className='group__name'>{FAKE_GROUPS[0].name}</h3>
                            <p>{FAKE_GROUPS[0].description}</p>
                            <div className='cards-container'>
                                {cards}
                            </div>
                        </div>
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
        </>
        )
    }
}