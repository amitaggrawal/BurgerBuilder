import React, { useState } from 'react';

import classes from './Layout.module.css';
import Aux from '../AUX/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';

function Layout(props) {

    const [state, updateState] = useState({
        showSidebar: false
    });

    function sidebarClosedHandler(){
        updateState({
            showSidebar: false
        });
    }

    function sidebarToggleHandler(){
        updateState({
            showSidebar: !state.showSidebar
        });
    }

    return (
        <Aux>
            <Toolbar 
                toggle= {sidebarToggleHandler} />
            <Sidebar
                open={state.showSidebar}
                closed={sidebarClosedHandler} />
            <main className={classes.content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;