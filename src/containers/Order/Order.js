import React, { Component } from 'react';
import Orders from '../../components/Orders/Orders';
import axios from "../../axios-order";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/action/index';
import Spinner from '../../components/UI/Spinner/Spinner'


class Order extends Component {
 
    componentDidMount(){
       this.props.onFetchOrders()
    }
  
    render() {
        let spinner=this.props.loading?<Spinner/>:null;
        return (
            <div>
                {spinner}
                {
                this.props.orders.map(order=>{
                    return  (<Orders ingredients={order.ingredients} 
                        price={order.totalPrice} 
                        key={order.id} 
                        name={order.order.name}
                        email={order.order.email}
                        street={order.order.street}
                        country={order.order.country}
                        zip={order.order.zipcode}/>)
                })
               
            }
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchOrders:()=>dispatch(actionCreators.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( Order,axios));