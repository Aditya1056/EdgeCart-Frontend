import React from "react";

import { motion } from "framer-motion";

import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";

import styles from './Notification.module.css';

interface notificationInterface{
    status: string | null,
    message: string | null
}

const Notification : React.FC<notificationInterface> = (props) => {

    let notificationTextClasses = styles['notification-text'];

    if(props.status === 'FAIL'){
        notificationTextClasses += ' ' + styles['fail'];
    }

    if(props.status === 'SUCCESS'){
        notificationTextClasses += ' ' + styles['success'];
    }

    return (
        <div className={styles['notification']} >
            <motion.p 
                className={notificationTextClasses} 
                initial={{opacity: 0, y: "-100%"}} 
                animate={{opacity: 1, y: "0"}} 
                transition={{duration: 0.5, type:"spring"}} 
                exit={{opacity: 0, y:"-100%"}} 
            >
                {props.status === 'FAIL' && <RxCrossCircled className={styles['fail-icon']} />}
                {props.status === 'SUCCESS' && <FaCheckCircle className={styles['success-icon']} />}
                {props.message} 
            </motion.p>
        </div>
    );
}

export default Notification;