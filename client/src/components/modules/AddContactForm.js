import React, { Component } from 'react';
import { 
    Modal, 
    Button,
    Form,
    Icon,
    Header,
} from 'semantic-ui-react';
import GlobalContext from '../../GlobalContext';

export default class AddContactForm extends Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            location: '',
            email: '',
            date: '',
            notes: '',
            openModal: false,
        }
    }

    handleOpen = () => {
        this.setState({ openModal: true });
    }

    handleClose = () => {
        this.setState({ openModal: false });
    }

    addContact = async () => {
        const body = {
            name: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            location: this.state.location,
            date: this.state.date,
            socials: [],
            notes: this.state.notes,
            groups: [],
            image: `https://api.adorable.io/avatars/150/${this.state.first_name}${this.state.last_name}.png`
        }
        this.context.addContact(body);
        this.handleClose();
    }


    render() {
        return (
            <Modal 
                open={this.state.openModal}
                onClose={this.handleClose}
                className='new-connection'
                trigger={<Button className='add-contact' icon floated='right' onClick={this.handleOpen}> <Icon name='add user'/>  &nbsp;Add Contact</Button>}
                size='tiny'>
                <Header as='h2'>
                    <Icon name='user circle outline'/>
                    <Header.Content>New Connection</Header.Content>
                </Header>
                <Form className='new-connection__form'>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid
                            required
                            label='First Name'
                            placeholder='First Name'
                            onChange={(e, data) => this.setState({ first_name: e.target.value })}
                            />
                        <Form.Input 
                            fluid
                            required
                            label='Last Name'
                            placeholder='Last Name'
                            onChange={(e, data) => this.setState({ last_name: e.target.value })}
                            />
                    </Form.Group>
                    <Form.Input 
                            fluid
                            icon
                            required
                            iconPosition='left'
                            type='email'
                            label='Email'
                            placeholder='email'
                            onChange={(e, data) => this.setState({ email: e.target.value })}
                            >
                            <input/>
                            <Icon name='at'/>
                    </Form.Input>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid
                            required
                            type='month'
                            label='First Met'
                            iconPosition='left'
                            onChange={(e, data) => this.setState({ date: e.target.value })}
                            />
                        <Form.Input 
                            fluid
                            icon
                            required
                            label='Location'
                            placeholder='e.g. New York, NY'
                            onChange={(e, data) => this.setState({ location: e.target.value })}
                            >
                            <input/>
                            <Icon name='location arrow'/>
                        </Form.Input>
                    </Form.Group>
                    <Form.TextArea 
                        label='Notes' 
                        placeholder='Any notes on your new connection?'
                        onChange={(e, data) => this.setState({ notes: e.target.value })}
                    />
                    <Form.Button onClick={this.addContact} floated='right'> Add </Form.Button>
                </Form>
            </Modal>
        )
    }
}
