import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modals from '../../components/UI/Modals/Modals';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreator from '../../store/action/index'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount=()=>{
        this.props.onInitIngredients()
      
    }
    purchaseStateUpdate(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((a, b) => {
            return a + b;
        }, 0);

        if(sum>0){
            return true
        }else{
            return false
        }

    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    backDropHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
        this.props.onPurchaseInit()
    }
    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        let Ordersummary=null;
        let burger=this.props.error?<Spinner/>:<p style={{textAlign:"center"}}>ingredients can't be loaded</p>
        if(this.props.ingredients){
            burger=(
                <Aux>
                     <Burger ingredients={this.props.ingredients} />
                        <BuildControls lessClickHandler={this.props.onRemoveIngredient}
                        moreClickHandler={this.props.onAddIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.purchaseStateUpdate(this.props.ingredients)}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
                Ordersummary = (
                <OrderSummary
                ingredients={this.props.ingredients}
                clicked={this.backDropHandler}
                price={this.props.totalPrice}
                continue={this.purchaseContinueHandler} />
                );
            
        }
        if(this.state.loading){
            Ordersummary=<Spinner/>;
        }
        return (
            <Aux>
                <Modals show={this.state.purchasing} clicked={this.backDropHandler} error={this.props.error}>
                        {Ordersummary}
                </Modals>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ingredients:state.burger.ingredients,
        totalPrice:state.burger.totalPrice,
        error:state.burger.noerror
    }
   
}

const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient:(type)=>dispatch(actionCreator.addIngredient(type)),
        onRemoveIngredient:(type)=>dispatch(actionCreator.removeIngredient(type)),
        onInitIngredients:()=>dispatch(actionCreator.initIngredients()),
        onPurchaseInit:()=>dispatch(actionCreator.purschaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));