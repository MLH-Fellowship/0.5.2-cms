import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return(
            <div className='home'>
                <main>
                    <h1 className='home__title'>
                        Connections
                    </h1>
                    <p className='home__tagline'>
                        your one-stop shop to keep track of the people you meet people 
                    </p>
                    <button>
                        Login
                    </button>
                </main>
            </div>
        )
    }
}