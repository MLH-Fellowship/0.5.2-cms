import React, { Component } from 'react';
import {
    Grid,
    TextArea,
    Image,
    Button,
    Icon,
    Input,
} from 'semantic-ui-react';
import '../../styles/profile.css';
import GlobalContext from '../../GlobalContext';
import { Redirect } from 'react-router-dom';

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
                : <Input as='p'>{props.text}</Input>
            }
        </div>
    )
}

class Sidebar extends Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = { 
            edit: false,
            edited_profile: {},
        }
    }

    componentDidMount() {
        this.setState({ edited_profile: { ...this.context.viewedProfile }})
    }

    startEdit = () => {
        this.setState({ edit: true });
    }

    saveEdit = () => {
        this.context.updateProfile(this.state.edited_profile);
        this.setState({ edit: false });
    }

    handleOnChange = (key, val) => {
        const { edited_profile } = this.state;
        edited_profile[key] = val;
        this.setState({ edited_profile });
    }

    render() {
        const { viewedProfile } = this.context;
        let buttons;
        if (this.state.edit) {
            buttons = <div>
                <Button onClick={() => this.setState({ edit: false, edited_profile: {...viewedProfile} })}> Cancel</Button>
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
                    src={viewedProfile.image}
                />
                <div className='sidebar__content'>
                    <h2 className='sidebar__name'>{viewedProfile.name}</h2>
                    <LabelText 
                        edit={this.state.edit} 
                        type='month' 
                        title='Met on' 
                        text={viewedProfile.date}
                        handleOnChange={(val) => this.handleOnChange('date', val)}
                        />
                    <LabelText 
                        edit={this.state.edit}
                        type='text' 
                        title='From' 
                        text={viewedProfile.location}
                        handleOnChange={(val) => this.handleOnChange('location', val)}
                        />
                    <LabelText 
                        edit={this.state.edit} 
                        type='email' 
                        title='Email' 
                        text={viewedProfile.email}
                        handleOnChange={(val) => this.handleOnChange('email', val)}
                        />
                </div>
                {buttons}
            </div>
        )
    } 
}

class MainInfo extends Component {
    static contextType = GlobalContext;
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            edited_notes: '',
        }
    }

    componentDidMount() {
        this.setState({ edited_notes: this.context.viewedProfile.notes });
    }
    generateCards = () => {
        return this.context.viewedProfile.groups.map((group,i) => (
            <div
                key={i}
                className={`group-card placeholder ${group.region}`}
            >
                <a onClick={() => {
                    this.setState({ redirect: true });
                    this.setViewedGroup(group);
                }}>
                    <h3>
                        {group.name}
                    </h3>
                    <Icon name='arrow right'/>
                </a>
            </div>
        ))
    }

    placeHolderGroups = (num) => {
        const cards = [];
        for(let i = 0; i < num; i++) {
            cards.push(<div className='group-card placeholder'></div>);
        }

        return cards;
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to='/groups/view'/>
        }
        const { viewedProfile } = this.context;
        return (
            <div className='main-profile'>
                <Grid centered divided='vertically' >
                    <Grid.Row stretched>
                        <Grid.Column>
                            <h2>Groups</h2>
                            <div className='group__cards'>
                                <div className='group__cards-row'>
                                    {this.generateCards()}
                                    {this.placeHolderGroups(viewedProfile.groups.length > 3 ? 0 : 3 - viewedProfile.groups.length)}
                                </div>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row stretched>
                        <Grid.Column>
                            <h2>Notes</h2>
                            <TextArea 
                                className='notes'
                                value={this.state.edited_notes}
                                onChange={(e, data) => this.setState({ edited_notes: e.target.value })}    
                            />
                            <div className='btn-container'>
                                <Button onClick={() => this.setState({ edited_notes: viewedProfile.notes })}>Undo All</Button>
                                <Button onClick={() => this.props.saveNotes(this.state.edited_notes)}>Save Changes</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default class Profile extends Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        // if (!this.context.user_id) {
        //     return <Redirect to='/'/>
        // }
        return(
            <div className='profile'>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Sidebar />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <MainInfo
                                saveNotes={this.context.updateNotes}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}