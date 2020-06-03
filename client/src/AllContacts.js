import React, { Component } from 'react';
import { FAKE_CONTACTS } from './data';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles/App.css';

export default class AllContacts extends Component {
    render() {
        const cards = FAKE_CONTACTS.map((contact, i) => (
            <Card className='card-profile' variant='outlined'>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        {contact.name}
                    </Typography>
                    <Typography>
                        {contact.location}
                    </Typography>
                    <Typography variant='body2'>
                        {`${contact.date_met.getMonth() + 1} - ${contact.date_met.getFullYear()}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small'>
                        View Profile
                    </Button>
                </CardActions>
            </Card>
        ));

        return (
            <main className='cards-container'>
                {cards}
            </main>
        )
    }
}

