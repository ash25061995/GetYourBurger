import * as actionType from '../action/actionTypes';


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
const reducer=(state=initialState,action)=>{

    switch(action.type){
        case(actionType.ADD_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                    
                },
                totalPrice:state.totalPrice+ingredientsPrice[action.ingredientName]
            }
        case(actionType.REMOVE_INGREDIENT):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-ingredientsPrice[action.ingredientName]
            }
        case(actionType.FAILED_INGREDIENTS):
            return{
                ...state,
                noerror:false
            }
        case(actionType.SET_INGREDIENTS):
            const setIngredient=Object.assign({},action.ingredients)
            return{
                ...state,
                ingredients:setIngredient,
                noerror:true
            }
        default:
            return state
    }

}

export default reducer;