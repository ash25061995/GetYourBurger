import React, { Component } from 'react';
import CheckOutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary';

class Checkout extends Component {
    state={
        ingredients:{
            meat:1,
            bacon:1,
            salad:1,
            cheese:1
        }
    }
    render() {
        return (
            <div>
                <CheckOutSummary ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default Checkout;