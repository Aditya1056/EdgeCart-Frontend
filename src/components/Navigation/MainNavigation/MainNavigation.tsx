import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { RiShoppingCartFill } from "react-icons/ri";
import { LuMenu } from "react-icons/lu";

import styles from "./MainNavigation.module.css";

import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";

const MainNavigation : React.FC = () => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const toggleSideDrawer = () => {
        setShowSideDrawer((prev) => !prev);
    }

    return (
        <>
            <AnimatePresence key="side-drawer-toggle" >
                {
                    showSideDrawer && <SideDrawer onClose={toggleSideDrawer} />
                }
            </AnimatePresence>
            <motion.div 
                className={styles['main-nav']} 
                initial={{y:"-100%"}} 
                animate={{y:"0%"}} 
                exit={{y:"-100%"}} 
                transition={{duration: 0.2, type:"keyframes"}} 
            >
                <div className={styles['main-nav-header']} >
                    <button 
                        type="button" 
                        className={styles['menu-btn']} 
                        onClick={toggleSideDrawer} 
                    >
                        <LuMenu />
                    </button>
                    <div className={styles['header-text']} >
                        <RiShoppingCartFill className={styles['shop-icon']} /> <p>Edge Cart</p>
                    </div>
                    <div className={styles['nav-links-left']} >
                        <NavLinks leftNav={true} rightNav={false} />
                    </div>
                </div>
                <div className={styles['nav-links-right']} >
                    <NavLinks leftNav={false} rightNav={true} />
                </div>
            </motion.div>
        </>
    );
}

export default MainNavigation;