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

export const purchaseBurgerSuccess=(data,orderData)=>{
        return{
            type:actionType.ORDER_SUCCESS,
            orders:orderData

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

export const purschaseInit=()=>{
    return{
        type:actionType.PURCHASE_INIT
    }
}

export const fetchOrders=()=>{
    return dispatch=>{
        dispatch(fetchedOrderInit());
        axios.get("/orders.json")
        .then(res=>{
            const fethchedOrders=[]
            for(let key in res.data){
                fethchedOrders.push({
                    ...res.data[key],
                    id:key})
            }
            dispatch(fetchedOrderSuccess(fethchedOrders))
        }).catch(err=>{
            dispatch(fetchedOrderFailed(err))
        })
    }
}

export const fetchedOrderInit=()=>{
    return{
        type:actionType.FETCH_ORDER_INIT
    }
}

export const fetchedOrderSuccess=(orders)=>{
    return{
        type:actionType.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchedOrderFailed=(err)=>{
    return{
        type:actionType.FETCH_ORDER_FAILED,
        error:err
    }
}