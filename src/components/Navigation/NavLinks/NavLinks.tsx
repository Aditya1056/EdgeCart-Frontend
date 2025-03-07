import React from "react";

import { NavLink } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";

import styles from './NavLinks.module.css';

import NavItem from './NavItem';

import { useAuthContext } from '../../../store/authContext';

import userProfileImage from '../../../assets/profile.png';

interface navLinksProps{
    leftNav:boolean,
    rightNav:boolean
}

const NavLinks: React.FC<navLinksProps> = (props) => {

    const auth = useAuthContext();

    return(
        <>
            {
                props.leftNav && 
                <ul className={styles['nav-links']} >
                    <NavItem to="/" value="Home" />
                    <NavItem to="/orders" value="Orders" />
                    <NavItem to="/cart" value="Cart" />
                </ul>
            }
            {
                props.rightNav && 
                <ul className={styles['nav-links']} >
                    <div className={styles['user-details']} >
                        <NavLink 
                            to="/profile" 
                            className={({isActive}) => {
                                return isActive ? styles.active : undefined;
                            }} 
                            title="profile" 
                        >
                            <img src={userProfileImage} alt={"profile"} />
                            <p>{auth.userName}</p>
                        </NavLink>
                    </div>
                    <button 
                        type="button"  
                        className={styles['logout-btn']} 
                        onClick={auth.logout} 
                        title="logout" 
                    >
                        <span>Logout</span><AiOutlineLogout />
                    </button>
                </ul>
            }
        </>
    );
}

export default NavLinks;