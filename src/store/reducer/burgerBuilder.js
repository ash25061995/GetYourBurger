import * as actionType from '../action/actionTypes';
import {updateObject} from '../utility';


const initialState={
    ingredients:null,
    totalPrice: 25,
    noerror:true

}
const ingredientsPrice={
    bacon:30,
    meat:40,
    salad:25,
    cheese:10
}

const addIngredient=(state,actionIng)=>{
    return{
        ingredients:{
            ...state.ingredients,
            [actionIng]:state.ingredients[actionIng]+1
            
        },
        totalPrice:state.totalPrice+ingredientsPrice[actionIng]
    }
}

const removeIngredient=(state,actionIng)=>{
    return{
        ingredients:{
            ...state.ingredients,
            [actionIng]:state.ingredients[actionIng]-1
            
        },
        totalPrice:state.totalPrice-ingredientsPrice[actionIng]
    }
}

const reducer=(state=initialState,action)=>{

    switch(action.type){
        case(actionType.ADD_INGREDIENT):
            const add_ingName=addIngredient(state,action.ingredientName)
            return updateObject(state,add_ingName)
        
        case(actionType.REMOVE_INGREDIENT):
            const remove_ingName=removeIngredient(state,action.ingredientName)
            return updateObject(state,remove_ingName)
    
        case(actionType.FAILED_INGREDIENTS):
            return updateObject(state,{noerror:false})
          
        case(actionType.SET_INGREDIENTS):
            const setIngredient=Object.assign({},action.ingredients)
            return updateObject(state,{ingredients:setIngredient,noerror:true,totalPrice:25})
          
        default:
            return state
    }

}

export default reducer;