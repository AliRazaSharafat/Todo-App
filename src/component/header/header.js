import React from 'react';
import './header.css';

const Header = props => {
    return (
        <header className="header">
            <p>You Have {props.number} Todo Tasks</p>
        </header>
    )
}

export default React.memo(Header);