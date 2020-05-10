import * as actionType from './../action/actionTypes';
import {updateObject} from '../utility';

const initialState={
    loading:false,
    error:null,
    orders:[],
    purchased:false
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.FETCH_ORDER_INIT:
            return updateObject(state,{loading:true})

        case actionType.FETCH_ORDER_SUCCESS:
            return updateObject(state,{orders:state.orders.concat(action.orders),loading:false})
    
        case actionType.FETCH_ORDER_FAILED:
            return updateObject(state,{loading:false})
           
        case(actionType.PURCHASE_INIT):
            return updateObject(state,{purchased:false})
        
        case(actionType.ORDER_SUCCESS):
            return updateObject(state,{purchased:true,orders:state.orders.concat(action.orders),loading:false})
           
        case(actionType.ORDER_FAILED):
            return updateObject(state,{error:action.error,loading:false})
    
        case(actionType.CLICK_ORDER):
            return updateObject(state,{loading:true})
            
        default:
            return state;
    }
}

export default reducer;