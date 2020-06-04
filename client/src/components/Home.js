import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
    render() {
        return(
            <div className='home'>
                <main className='home__container'>
                    <h1 className='home__title'>
                        Connections
                    </h1>
                    <p className='home__tagline'>
                        Your one-stop shop to keep track of the people you meet people
                    </p>
                    <div className='home__btns'>
                        <Button variant='outlined' size='large' className='inverted-btn'>
                            Login
                        </Button>
                        <Button variant='outlined' size='large' className='inverted-btn'>
                            Register
                        </Button>
                    </div>
                </main>
            </div>
        )
    }
}