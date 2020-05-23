import React from 'react';
import classes from './SidebarToggle.module.css';

const sidebarToggle = (props) => (
    <div onClick={props.clicked} className={classes.SidebarToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sidebarToggle;