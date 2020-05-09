import * as actionType from './actionTypes';
import axios from '../../../src/axios-order';

export const addIngredient=(type)=>{
    return{
        type:actionType.ADD_INGREDIENT,
        ingredientName:type
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionType.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredients=(ingredients)=>{
    return{
        type:actionType.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const failedIngredients=()=>{
    return{
        type:actionType.FAILED_INGREDIENTS
    }
}

export const initIngredients=()=>{
    return dispatch=>{
        axios.get("https://react-getyourburger.firebaseio.com/ingredients.json").then(res=>{
            console.log(res.data)
            return dispatch(setIngredients(res.data))
        }).catch(err=>{
            return dispatch(failedIngredients())
        })
    }
}