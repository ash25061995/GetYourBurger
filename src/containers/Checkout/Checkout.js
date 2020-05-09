import React, { Component } from 'react';
import CheckOutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary';
import {Route} from 'react-router-dom';
import Contact from '../../containers/Checkout/Contact/Contact';
import {connect} from 'react-redux';
class Checkout extends Component {
  
    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact')
    }
    
    render() {
        console.log(this.props.match.path+'/contact')
        return (
            <div>
                <CheckOutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact'}  component={Contact}/>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ingredients:state.burger.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);