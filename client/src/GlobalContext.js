import React, { Component } from 'react';
import { post } from './utilities';
const Context = React.createContext({});

export class GlobalStore extends Component {
    state = {
        user_id: null,
        username: '',
        contacts: [],
        groups: [],
        viewedProfile: {},
        viewedGroup: {},
    }

    updateNotes = async (notes) => {
        const updated_contacts = this.state.contacts.map((contact) => {
            if (contact === this.state.viewedProfile) {
                contact.notes = notes;
                this.setState({ viewedProfile: contact });
                return contact;
            } 
            return contact;
        });
        
        const body = {
            username: this.state.username,
            contacts: updated_contacts,
        }

        // send API post updating contact 
        await post('/api/contact', body);
        this.setState({ contacts: updated_contacts});
    }

    updateProfile = async (profile) => {
        const updated_contacts = this.state.contacts.map((contact) => {
            if (contact === this.state.viewedProfile) {
                this.setState({ viewedProfile: profile });
                return profile;
            }
            return contact;
        });

        const body = {
            username: this.state.username,
            contacts: updated_contacts,
        }
        // send API updating contact
        await post('/api/contact', body);
        this.setState({ contacts: updated_contacts });
    }

    addSocial = async (social) => {
        console.log(social);
        const updated_contacts = this.state.contacts.map((contact) => {
            if (contact === this.state.viewedProfile) {
                const updated_contact = {... contact };
                updated_contact.socials.push(social);
                this.setState({ viewedProfile: updated_contact });
                return updated_contact;
            }
            return contact;
        });

        const body = {
            username: this.state.username,
            contacts: updated_contacts,
        }
        // send API updating contact
        await post('/api/contact', body);
        this.setState({ contacts: updated_contacts });
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    initState: (user_id, username, groups, contacts) => this.setState({ user_id, username, groups, contacts }),
                    addContact: (contact) => this.setState({ contacts: this.state.contacts.concat(contact) }),
                    addGroup: (group) => this.setState({ groups: this.state.groups.concat(group) }),
                    setViewedProfile: (viewedProfile) => this.setState({ viewedProfile }),
                    setViewedGroup: (viewedGroup) => this.setState({ viewedGroup }),
                    updateNotes: this.updateNotes,
                    updateProfile: this.updateProfile,
                    clearData: () => this.setState({ user_id: '', groups: [], contacts: [], viewedGroup: {}, viewedProfile: {} }),
                    setGroups: (groups) => this.setState({ groups }),
                    setContacts: (contacts) => this.setState({ contacts }),
                    addSocial: this.addSocial,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;