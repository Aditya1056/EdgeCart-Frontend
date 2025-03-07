import React from "react";

import styles from "./Loading.module.css";

import Backdrop from "../Backdrop/Backdrop";

const Loading : React.FC = () => {
    return (
        <>
            <Backdrop />
            <div className={styles['loading-container']} >
                <div className={styles['loading-box']} >
                    <div className={styles['loading-spinner']} />
                </div>
            </div>
        </>
    );
}

export default Loading;