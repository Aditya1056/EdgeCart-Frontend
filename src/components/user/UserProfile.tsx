import React from "react";

import styles from './UserProfile.module.css';

import { useAuthContext } from "../../store/authContext";

const UserProfile : React.FC = () => {

    const auth = useAuthContext();

    return (
        <div className={styles['profile-container']} >
            <h1>{auth.userName}</h1>
            <h3>{auth.userEmail}</h3>
        </div>
    );
}

export default UserProfile;