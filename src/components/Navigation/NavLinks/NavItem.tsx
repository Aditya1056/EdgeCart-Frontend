import React from "react";

import { NavLink } from 'react-router-dom';

import styles from './NavItem.module.css';

interface navItemProps{
    to:string,
    value:string
}

const NavItem : React.FC<navItemProps> = (props) => {

    return (
        <li className={styles['nav-item']} >
            <NavLink 
                className={({isActive}) => {
                    return isActive ? styles.active : undefined;
                }} 
                to={props.to} 
            >
                {props.value} 
            </NavLink>
        </li>
    );
}

export default NavItem;