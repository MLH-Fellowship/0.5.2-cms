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
        const { viewedGroup } = this.context;
        // if (!this.context.user_id) {
        //     return <Redirect to='/'/>
        // }

        const cards = viewedGroup.contacts.map((contact) => (
            <Card
                className='profile-card'
                contact={contact}
                redirect={() => {}}
            />
        ))

        return (
        <>
            <div 
                className={`group-img ${viewedGroup.region}`}
                ></div>
            <Grid stackable stretched>
                <Grid.Row className='group__info-row'>
                    <Grid.Column floated='right' width={12}>
                        <div className='group__info'>
                            <h3 className='group__name'>{viewedGroup.group}</h3>
                            <p>{viewedGroup.description}</p>
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