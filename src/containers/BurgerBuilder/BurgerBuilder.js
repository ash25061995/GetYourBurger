import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modals from '../../components/UI/Modals/Modals';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../../src/axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const ingredientsPrice = {
    salad: 25,
    cheese: 10,
    meat: 50,
    bacon: 40
}

class BurgerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 25,
        purchasable: false,
        purchasing: false,
        loading: false,
        noerror:true
    }
    componentDidMount=()=>{
        axios.get("https://react-getyourburger.firebaseio.com/ingredients.json").then(res=>{
            this.setState({ingredients:res.data})
        }).catch(err=>{
            this.setState({noerror:false})
            console.log("from main catch")
        })
    }
    purchaseStateUpdate(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((a, b) => {
            return a + b;
        }, 0);

        this.setState({ purchasable: sum > 0 })

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
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - ingredientsPrice[type];
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
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientsPrice[type];
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.purchaseStateUpdate(updatedIngredients)


    }
    purchaseHandler = () => {
        this.setState({ purchasing: true });
        this.setState({noerror:true})
    }
    backDropHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'ashwani',
                address: {
                    street: 'testStreet',
                    zipcode: '110085',
                    country: 'india'
                },
                email: 'xyz@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({loading:false});
        }).catch(err => {
            console.log("from catch")
            this.setState({noerror:false})
            this.setState({loading:false});
        })
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0
        }
        let Ordersummary=null;
        let burger=this.state.noerror?<Spinner/>:<p style={{textAlign:"center"}}>ingredients can't be loaded</p>
        if(this.state.ingredients){
            burger=(
                <Aux>
                     <Burger ingredients={this.state.ingredients} />
                        <BuildControls lessClickHandler={this.lessClickHandler}
                        moreClickHandler={this.moreClickHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            )
                Ordersummary = (
                <OrderSummary
                ingredients={this.state.ingredients}
                clicked={this.backDropHandler}
                price={this.state.totalPrice}
                continue={this.purchaseContinueHandler} />
                );
            
        }
        if(this.state.loading){
            Ordersummary=<Spinner/>;
        }
        return (
            <Aux>
                <Modals show={this.state.purchasing} clicked={this.backDropHandler} error={this.state.noerror}>
                        {Ordersummary}
                </Modals>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);