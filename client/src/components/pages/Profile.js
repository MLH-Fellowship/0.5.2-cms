import React, { Component } from 'react';
import {
    Grid,
    Segment,
    Image,
    Button,
    Icon,
    Input,
} from 'semantic-ui-react';
import '../../styles/profile.css';
import { FAKE_CONTACTS } from '../../data';

function LabelText(props) {
    return(
        <div className='labelText'>
            <span>{props.title}:</span>
            { props.edit 
                ? <Input
                    type={props.type}
                    className='labelText__field'
                    defaultValue={props.text}
                    onChange={(e, data) => props.handleOnChange(e.target.value)}
                />
                : <Input transparent as='p'>{props.text}</Input>
            }
        </div>
    )
}

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            edit: false,
            edited_profile: { ...this.props.profile },
        }
    }

    startEdit = () => {
        this.setState({ edit: true });
    }

    saveEdit = () => {
        this.props.updateProfile(this.state.edited_profile);
        this.setState({ edit: false });
    }

    handleOnChange = (key, val) => {
        const edited_profile = {...this.state.edited_profile};
        edited_profile[key] = val;
        this.setState({ edited_profile });
    }

    render() {
        let buttons;
        if (this.state.edit) {
            buttons = <div>
                <Button onClick={() => this.setState({ edit: false, edited_profile: {...this.props.profile} })}> Cancel</Button>
                <Button icon labelPosition='left' onClick={this.saveEdit}> Save <Icon name='save'/></Button>
            </div>
        } else {
            buttons = <Button
                icon
                labelPosition='left'
                className='edit-btn'
                onClick={() => this.setState({ edit: true })}
            >
                Edit Info
                <Icon name='pencil'/>
            </Button>
        }

        return (
            <div className='sidebar'>
                <Image
                    size='large'
                    src={this.props.profile.image}
                />
                <div className='sidebar__content'>
                    <h2 className='sidebar__name'>{this.props.profile.name}</h2>
                    <LabelText 
                        edit={this.state.edit} 
                        type='month' 
                        title='Met on' 
                        text={this.props.profile.date_met}
                        handleOnChange={(val) => this.handleOnChange('date_met', val)}
                        />
                    <LabelText 
                        edit={this.state.edit}
                        type='text' 
                        title='From' 
                        text={this.props.profile.location}
                        handleOnChange={(val) => this.handleOnChange('location', val)}
                        />
                    <LabelText 
                        edit={this.state.edit} 
                        type='email' 
                        title='Email' 
                        text={this.props.profile.email}
                        handleOnChange={(val) => this.handleOnChange('email', val)}
                        />
                </div>
                {buttons}
            </div>
        )
    } 
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {...FAKE_CONTACTS[0] },
        }
    }
    
    render() {
        return(
            <div className='profile'>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Sidebar 
                                profile={this.state.profile}
                                updateProfile={(profile) => this.setState({ profile })}
                                />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Segment></Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}