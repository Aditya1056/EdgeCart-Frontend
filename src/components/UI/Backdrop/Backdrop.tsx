import React from "react";

import ReactDOM from "react-dom";

import styles from './Backdrop.module.css';

const Backdrop : React.FC = () => {

    let content =  (
        <div className={styles['backdrop']} />
    );

    return ReactDOM.createPortal(content, document.getElementById('backdrop')!);
}

export default Backdrop;