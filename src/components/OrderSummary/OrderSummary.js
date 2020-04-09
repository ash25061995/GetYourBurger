import React from 'react';
import Aux from '../../hoc/Aux'

const OrderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igkey=>{
        return <li><span style={{textTransform:"capitalize"}}>{igkey}</span>: {props.ingredients[igkey]} </li>
    })
    
    return(
        <Aux>
             <h1>Your Order</h1>
             <p>A delicious burger with the following ingredients:</p>
             <ul>{ingredientSummary}</ul>
             <p>continue to check out?</p>
        </Aux>
       
    )
}

export default OrderSummary;