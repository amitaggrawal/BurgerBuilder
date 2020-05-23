import React, { Component } from "react";

import Order from '../../components/Order/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchOrders })
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false })
            })
    }

    render() {
        return (
            <div>
               {this.state.orders.map(order => (
                   <Order 
                    key={order.id}
                    id={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    deliverdTo={order.customer}/>
               ))};
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);