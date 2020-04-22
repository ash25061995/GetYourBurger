import React from 'react';
import Aux from '../../hoc/Aux/Aux'
import Button from '../Button/Button';

const OrderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igkey=>{
        return <li key={igkey}><span style={{textTransform:"capitalize"}}>{igkey}</span>: {props.ingredients[igkey]} </li>
    })
    
    return(
        <Aux>
             <h1>Your Order</h1>
             <p>A delicious burger with the following ingredients:</p>
             <ul>{ingredientSummary}</ul>
             <h3>Total Price: {props.price}</h3>
             <p>continue to check out?</p>
             <Button btnType="Danger" clicked={props.clicked}>Cancel</Button>
             <Button btnType="Success" clicked={props.continue}>Continue</Button>
        </Aux>
       
    )
}

export default OrderSummary;