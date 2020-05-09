import * as actionType from './../action/actionTypes';

const initialState={
    loading:false,
    error:null
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(actionType.ORDER_SUCCESS):
            return{
                ...state,
                loading:false
            }
        case(actionType.ORDER_FAILED):
            return{
                ...state,
                error:action.error
            }
        case(actionType.CLICK_ORDER):
            return{
                ...state,
                loading:true
            }
        default:
            return state;
    }
}

export default reducer;