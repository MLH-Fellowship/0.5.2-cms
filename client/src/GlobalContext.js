import React, { Component } from 'react';
const Context = React.createContext({});

export class GlobalStore extends Component {
    state = {
        user_id: null,
        contacts: [],
        groups: [],
        viewedProfile: {},
        viewedGroup: {},
    }

    updateNotes = (notes) => {
        const updated_contacts = this.state.contacts.map((contact) => {
            if (contact === this.state.viewedProfile) {
                contact.notes = notes;
                this.setState({ viewedProfile: contact });
                return contact;
            } 
            return contact;
        });
        
        // send API post updating contact 
        this.setState({ contacts: updated_contacts});
    }

    updateProfile = (profile) => {
        const updated_contacts = this.state.contacts.map((contact) => {
            if (contact === this.state.viewedProfile) {
                this.setState({ viewedProfile: profile });
                return profile;
            }
            return contact;
        });

        // send API updating contact
        this.setState({ contacts: updated_contacts });
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                    addContact: (contact) => this.setState({ contacts: this.state.contacts.concat(contact) }),
                    addGroup: (group) => this.setState({ contacts: this.state.contacts.concat(group) }),
                    setViewedProfile: (viewedProfile) => this.setState({ viewedProfile }),
                    setViewedGroup: (viewedGroup) => this.setState({ viewedGroup }),
                    updateNotes: this.updateNotes,
                    updateProfile: this.updateProfile,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;