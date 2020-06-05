import React, { Component } from 'react';
const Context = React.createContext({});

export class GlobalStore extends Component {
    state = {
        user_id: null,
        contacts: [],
        groups: [],
    }

    render() {
        return (
            <Context.Provider
                value={{
                    ...this.state,
                }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;