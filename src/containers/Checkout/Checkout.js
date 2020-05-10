import React, { Component } from 'react';
import CheckOutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary';
import {Route,Redirect} from 'react-router-dom';
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
        let summary=<Redirect to="/"/>
        if(this.props.ingredients){
            const purchasedContext=this.props.purchased?<Redirect to="/"/>:null;
            summary=(
                <div>
                    {purchasedContext}
                <CheckOutSummary ingredients={this.props.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact'}  component={Contact}/>
            </div>
            )
        }
        return summary;
    }
}

const mapStateToProps=state=>{
    return{
        ingredients:state.burger.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);