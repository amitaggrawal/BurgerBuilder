import React, {memo} from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/AUX/Aux';
import Backdrop from '../Backdrop/Backdrop';

const memoDependecyFunction = (prevProps, nextProps) => (
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
)

const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.closed}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>
);

export default memo(modal, memoDependecyFunction);