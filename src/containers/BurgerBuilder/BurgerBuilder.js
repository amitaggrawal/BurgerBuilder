import React, { Component } from 'react';

import Aux from '../../hoc/AUX/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        purchaseable: false,
        purchasing: false,
        totalPrice: 4,
        loading: false,
        error: false
    }

    componentDidMount() {

        axios.get('https://burgershop-ac39e.firebaseio.com/ingredients.json')
            .then(response => {
                console.log(response);
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({
                    error: true
                });
            })

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert('You have purchased a delicious burger!');
        
        let searchParam = new URLSearchParams(this.state.ingredients);
        searchParam.append('price', this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',

            search: new URLSearchParams(searchParam).toString()
        });


        // const queryParam = [];
        // for (let i in this.state.ingredients){
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParam.push('price=' + this.state.totalPrice);
        // const queryString = queryParam.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });
    }

    updatePurchaseState = (ingredients) => {

        // const ingredients = {
        //     ...this.state.ingredients
        // }

        const sumIngredients = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        console.log(sumIngredients);

        this.setState({
            purchaseable: sumIngredients > 0
        })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };

        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        });

        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };

        updatedIngredient[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p> We are facing problems in loading ingredients</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />

                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        order={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients} />

            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    closed={this.purchaseCancelHandler}>

                    {orderSummary}

                </Modal>

                {burger}

            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);