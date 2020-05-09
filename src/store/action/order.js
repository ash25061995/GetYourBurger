import * as actionType from './actionTypes';
import axios from '../../axios-order';

export const  purchaseBurgerStart=(orderData)=>{
    return dispatch=>{
        axios.post('/orders.json', orderData).then(res => {
            dispatch(purchaseBurgerSuccess(res.data,orderData))
        }).catch(err => {
            dispatch(purchaseBurgerFailed(err))
        })
    }
}

export const purchaseBurgerSuccess=()=>{
        return{
            type:actionType.ORDER_SUCCESS,

        }
}

export const clickOrder=()=>{
    return{
        type:actionType.CLICK_ORDER
    }
    
}

export const purchaseBurgerFailed=(err)=>{
    return{
        type:actionType.ORDER_FAILED,
        error:err
    }
}