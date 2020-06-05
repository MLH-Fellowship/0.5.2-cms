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
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            group: '',
            region: '',
            description: '',
            openModal: false,
            selected_contacts: new Set(),

        }
    }

    handleClose = () => {
        this.setState({ openModal: false });
    }

    handleOpen = () => {
        this.setState({ openModal: true });
    }

    getOptions = () => {
        const all_options = this.context.contacts;
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

    createGroup = () => {
        const { group, description, selected_contacts, region } = this.state; 
        if (!group || !description || !region) {
            return;
        }

        const body = {
            group,
            description,
            region,
            contacts: [...selected_contacts],
        };
        console.log(body);
        this.context.addGroup(body);
        this.handleClose();
    }

    render() {
        return (
            <Modal 
                open={this.state.openModal}
                onClose={this.handleClose}
                className='new-group'
                trigger={<Button className='create-group' floated='right' icon onClick={this.handleOpen}> <Icon name='group'/>  &nbsp;Create Group</Button>}
                size='tiny'>
                <Header as='h2'>
                    <Icon name='group'/>
                    <Header.Content>New Group</Header.Content>
                </Header>
                <Form className='new-group__form'>
                    <Form.Group widths='equal'>
                        <Form.Input 
                            required
                            fluid
                            label='Group Name'
                            placeholder='Group Name'
                            onChange={(e, data) => this.setState({ group: e.target.value })}
                            />
                        <Form.Field
                            fluid
                            required
                            control={Select}
                            options={GROUP_TYPES}
                            label='Region'
                            placeholder='Region'
                            onChange={(e, data) => this.setState({ region: data.value })}
                            />
                    </Form.Group>
                    <Form.Field
                        fluid
                        control={Select}
                        options={this.getOptions()}
                        label='Choose Contacts'
                        placeholder='Select user(s)'
                        value=''
                        onChange={(e, data) => {
                            console.log(data.value); 
                            this.setState({ selected_contacts: this.state.selected_contacts.add(data.value)});
                        }}
                    />
                    <div>
                        {[...this.state.selected_contacts].map((contact) => 
                            <SelectedUser name={contact.name} removeUser={() => this.removeUser(contact)}/>)}
                    </div>
                    <Form.TextArea 
                        required 
                        label='Description' 
                        placeholder='Add a description about the group'
                        onChange={(e, data) => this.setState({ description: e.target.value })}
                    />
                    <Form.Button 
                        floated='right'
                        onClick={this.createGroup}
                    > 
                        Create 
                    </Form.Button>
                </Form>
            </Modal>
        )
    }
}

export default class ContactBook extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }


    generateCards = () => {
        return this.context.groups.map((group,i) => (
            <div
                key={i}
                className={`group-card placeholder large ${group.region}`}
            >
                <a 
                    onClick={() => {
                        this.setState({ redirect: true });
                        this.context.setViewedGroup(group);
                    }}
                >
                    <h3>
                        {group.group}
                    </h3>
                    <Icon name='arrow right'/>
                </a>
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
        if (this.state.redirect) {
            return <Redirect to='/groups/view' />
        }
        const { groups } = this.context;
        // if (!this.context.user_id) {
        //     return <Redirect to='/'/>
        // }
        return (
            <div className='groups'>
                <h3 className='groups__title page__header'>
                    Contact Book
                </h3>
                <p>Organize your connections by groups!</p>
                <div className='groups__cards'>
                    <div className='groups__cards-row'>
                        {this.generateCards()}
                        {this.placeHolderGroups( groups.length > 3 ? 0 : 3 - groups.length)}
                    </div>
                </div>
                <AddGroupForm/>
            </div>
        )
    }
}