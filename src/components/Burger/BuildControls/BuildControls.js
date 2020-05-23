import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]


// We have to identify, added was clicked on which type of label. Means what is added to the burger.
//To achive this we passed the type to the function and that's why we had type in controls initially.

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        ))}
        <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.order}>ORDER NOW</button>
    </div>
);

export default buildControls;