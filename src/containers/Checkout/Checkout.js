import React, { Component } from 'react';
import CheckOutSummary from '../../components/Orders/CheckOutSummary/CheckOutSummary';
import {Route} from 'react-router-dom';
import Contact from '../../containers/Checkout/Contact/Contact';

class Checkout extends Component {
    state={
        ingredients:null,
        totalPrice:0
    }
    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact')
    }
    
    componentWillMount(){
        const ingredients={}
        const params= new URLSearchParams(this.props.location.search)
        for(let i of params.entries()){
            if(i[0]==='price'){
                this.setState({totalPrice:i[1]})
            }else{
                ingredients[i[0]]=+i[1]
            }
           
        }
        this.setState({ingredients:ingredients})
    }
    
    render() {
        console.log(this.props.match.path+'/contact')
        return (
            <div>
                <CheckOutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelledHandler} checkoutContinue={this.checkoutContinueHandler}/>
                <Route path={this.props.match.path+'/contact'}  render={()=>(<Contact ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)}/>
            </div>
        );
    }
}

export default Checkout;