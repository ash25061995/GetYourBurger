import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const ingredientsPrice = {
    salad: 25,
    cheese: 10,
    meat: 50,
    bacon: 40
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0

        },
        totalPrice: 25,
        purchasable:false
    } 
    purchaseStateUpdate(ingredients){
        const sum=Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey]
        }).reduce((a,b)=>{
            return a+b;
        },0);

        this.setState({purchasable:sum>0})
        
    }
    lessClickHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        let newCount = oldCount - 1;
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        // const updatedPrice = Object.keys(updatedIngredients).map(type => {
        //     return updatedIngredients[type] * ingredientsPrice[type]
        // }).reduce((a, b) => {
        //     return a + b
        // }, 0)
        // console.log(updatedPrice)
        
        // setTimeout(() => {
        //     this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice})
        //     console.log(this.state.totalPrice)
        // }, 0);
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-ingredientsPrice[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.purchaseStateUpdate(updatedIngredients)
        setTimeout(() => {
            console.log(this.state.totalPrice)
        }, 0);
    }
    moreClickHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        // const updatedPrice = Object.keys(updatedIngredients).map(type => {
        //     return updatedIngredients[type] * ingredientsPrice[type]
        // }).reduce((a, b) => {
        //     return a + b
        // }, 0)
        // console.log(updatedPrice)
        // this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice })
        // setTimeout(() => {
        //     console.log(this.state.totalPrice)
        // }, 0);
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+ingredientsPrice[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.purchaseStateUpdate(updatedIngredients)
        setTimeout(() => {
            console.log(this.state.totalPrice)
        }, 0);
        

    }
    render() {
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let i in disabledInfo){
            disabledInfo[i]=disabledInfo[i]<=0
        }
        console.log({disabledInfo})
        return (
            <Aux>
                <p>BurgerBuilder</p>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls lessClickHandler={this.lessClickHandler}
                    moreClickHandler={this.moreClickHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} 
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;