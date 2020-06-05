import React, { Component } from 'react';
import '../../styles/groups.css';
import { FAKE_CONTACTS, FAKE_GROUPS } from '../../data';
import {
    Modal,
    Button,
    Form,
    Header,
    Icon,
    Select,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import GlobalContext from '../../GlobalContext';

const GROUP_TYPES = [
    {
        key: 'Global',
        text: 'Global',
        value: 'Global',
    },
    {
        key: 'Americas',
        text: 'Americas',
        value: 'Americas',
    },
    {
        key: 'EMEA',
        text: 'EMEA',
        value:  'EMEA',
    },
    {
        key: 'APAC',
        text: 'APAC',
        value: 'APAC',
    },
]


function SelectedUser(props) {
    return (
        <div 
            className='selected-user'
            onClick={props.removeUser}
        >
             {props.name}
        </div>
    )
}

class AddGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_contacts: new Set(),
        }
    }

    getOptions = () => {
        const all_options = FAKE_CONTACTS;
        return  all_options
            .filter((option) => 
                !(this.state.selected_contacts.has(option)))
            .map((option) => (
                {
                    key: option.id,
                    value: option,
                    text: option.name,
                }
            ))
    }

    removeUser = (contact) => {
        const { selected_contacts } = this.state;
        selected_contacts.delete(contact);
        this.setState({ selected_contacts });
    }

    render() {
        return (
            <Modal 
                className='new-group'
                trigger={<Button floated='right' icon> <Icon name='group'/>  &nbsp;Create Group</Button>}
                size='tiny'>
                <Header as='h2'>
                    <Icon name='group'/>
                    <Header.Content>New Group</Header.Content>
                </Header>
                <Form className='new-group__form'>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            fluid
                            label='Group Name'
                            placeholder='Group Name'
                        />
                        <Form.Field
                            fluid
                            control={Select}
                            options={GROUP_TYPES}
                            label='Region'
                            placeholder='Region'
                        />
                    </Form.Group>
                    <Form.Field
                        fluid
                        control={Select}
                        options={this.getOptions()}
                        label='Choose Contacts'
                        placeholder='Select user(s)'
                        value=''
                        onChange={(e, data) => {console.log(data.value); this.setState({ selected_contacts: this.state.selected_contacts.add(data.value)});}}
                    />
                    <div>
                        {[...this.state.selected_contacts].map((contact) => 
                            <SelectedUser name={contact.name} removeUser={() => this.removeUser(contact)}/>)}
                    </div>
                    <Form.TextArea label='Description' placeholder='Add a description about the group'/>
                    <Form.Button floated='right'> Create </Form.Button>
                </Form>
            </Modal>
        )
    }
}

export default class ContactBook extends Component {
    static contextType = GlobalContext;

    generateCards = () => {
        return FAKE_GROUPS.map((group,i) => (
            <div
                key={i}
                className={`group-card placeholder large ${group.region}`}
            >
                <Link to='/groups/view'>
                    <h3>
                        {group.name}
                    </h3>
                    <Icon name='arrow right'/>
                </Link>
            </div>
        ))
    }
    placeHolderGroups = (num) => {
        const cards = [];
        for(let i = 0; i < num; i++) {
            cards.push(<div className='group-card placeholder large'></div>);
        }
        return cards;
    }

    render() {
        if (!this.context.user_id) {
            return <Redirect to='/'/>
        }
        return (
            <div className='groups'>
                <h3 className='groups__title page__header'>
                    Contact Book
                </h3>
                <p>Organize your connections by groups!</p>
                <div className='groups__cards'>
                    <div className='groups__cards-row'>
                        {this.generateCards()}
                        {this.placeHolderGroups( FAKE_GROUPS.length > 3 ? 0 : 3 - FAKE_GROUPS.length)}
                    </div>
                </div>
                <AddGroupForm/>
            </div>
        )
    }
}