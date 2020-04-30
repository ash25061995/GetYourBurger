import React, { Component } from 'react';
import Orders from '../../components/Orders/Orders';
import axios from "../../axios-order";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Order extends Component {
    state={
        orders:[]
    }
    componentDidMount(){
        console.log("component order will mount")
        axios.get("/orders.json")
        .then(res=>{
            console.log("res from server: ",res.data)
            const fethchedOrders=[]
            for(let key in res.data){
                fethchedOrders.push({
                    ...res.data[key],
                    id:key})
            }
            console.log(fethchedOrders)
            this.setState({orders:fethchedOrders})
            console.log(this.state.orders)
        }).catch(err=>{
            console.log(err)
        })
    }
  
    render() {
        console.log(this.state.orders)
        return (
            <div>{
                this.state.orders.map(order=>{
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

export default withErrorHandler( Order,axios);