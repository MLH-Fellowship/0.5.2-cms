import React, { Component } from 'react';
import { FAKE_CONTACTS } from '../../data';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import { styled } from '@material-ui/core/styles';
import { Modal } from 'semantic-ui-react';
import '../../styles/App.css';
import AddContactForm from '../modules/AddContactForm';

const Avatar = styled(CardMedia)({
    height: 250, 
})

export default class AllContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openForm: false,
        }
    }
    
    render() {
        const cards = FAKE_CONTACTS.map((contact, i) => (
            <Card className='card-profile' variant='outlined'>
                <Avatar
                    image={contact.image}
                    title={contact.name + '_avatar'}
                />
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

