import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Sidebar.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/AUX/Aux';

const sidebar = (props) => {
    let attachedClasses = [classes.SideBar, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideBar, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
        </Aux>
    );
}

export default sidebar;
