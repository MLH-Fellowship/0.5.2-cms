import React, { Component } from 'react';
import { 
    Modal, 
    Button,
    Form,
    Icon,
    Header,
} from 'semantic-ui-react';

export default class AddContactForm extends Component {
    render() {
        return (
            <Modal 
                className='new-connection'
                trigger={<Button icon floated='right'> <Icon name='add user'/>  &nbsp;Add Contact</Button>}
                size='tiny'>
                <Header as='h2'>
                    <Icon name='user circle outline'/>
                    <Header.Content>New Connection</Header.Content>
                </Header>
                <Form className='new-connection__form'>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid
                            label='First Name'
                            placeholder='First Name'
                        />
                        <Form.Input 
                            fluid
                            label='Last Name'
                            placeholder='Last Name'
                        />
                    </Form.Group>
                    <Form.Input 
                            fluid
                            icon
                            iconPosition='left'
                            type='email'
                            label='Email'
                            placeholder='email'
                        >
                            <input/>
                            <Icon name='at'/>
                    </Form.Input>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid
                            type='month'
                            label='First Met'
                            iconPosition='left'
                            />
                        <Form.Input 
                            fluid
                            icon
                            label='Location'
                            placeholder='e.g. New York, NY'
                        >
                            <input/>
                            <Icon name='location arrow'/>
                        </Form.Input>
                    </Form.Group>
                    <Form.TextArea label='Notes' placeholder='Any notes on your new connection?'/>
                    <Form.Button floated='right'> Add </Form.Button>
                </Form>
            </Modal>
        )
    }
}
