import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = (props) => {
    return (
        <header className="navbar">
            <div className="Logo">
                <NavLink to='/'>
                    <p>VERITAS LIMITED</p>
                </NavLink>
            </div>
            <div className="navigationList">
                <ul>
                    <NavLink to="/">
                        <li className="navlist active">
                            Todo List
                    </li>
                    </NavLink>
                    <NavLink to="/completed">
                        <li className="navlist">
                            Completed Tasks
                    </li>
                    </NavLink>
                    <NavLink to="/deleted">
                        <li className="navlist">
                            Deleted Tasks
                    </li>
                    </NavLink>
                    <NavLink to="/login">
                        <li className="navlist">
                            Login
                    </li>
                    </NavLink>
                </ul>
            </div>
        </header>
    )
}

export default Navbar;