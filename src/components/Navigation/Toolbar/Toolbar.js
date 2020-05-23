import React from 'react';
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';

//<div onClick={props.openSidebar}> <span className={classes.Menu}>MENU</span></div>
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <SidebarToggle clicked={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
