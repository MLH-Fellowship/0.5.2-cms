import React, { Component } from 'react';

import '../../styles/groups.css';
export default class ContactBook extends Component {
    placeHolderGroups = (num) => {
        const cards = [];
        for(let i = 0; i < num; i++) {
            cards.push(<div className='group-card placeholder large'></div>);
        }
        return cards;
    }

    render() {
        return (
            <div className='groups'>
                <h3 className='groups__title page__header'>
                    Contact Book
                </h3>
                <p>Organize your connections by groups!</p>
                <div className='groups__cards'>
                    <div className='groups__cards-row'>
                        {this.placeHolderGroups(3)}
                    </div>
                </div>
            </div>
        )
    }
}