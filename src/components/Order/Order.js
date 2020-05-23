import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    padding: '5px',
                    margin: '0 8px',
                }}
                key={ig.name}> {ig.name} ({ig.amount})</span>
        )
    })
    return (
        <div className={classes.Order}>
            <p> Order Details</p>

            <p> Order ID: <span> {props.id}</span></p>
            <p> Price: <strong> $ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
            <p> Ingredients: {ingredientOutput}</p>

        </div>
    );
};

export default order;