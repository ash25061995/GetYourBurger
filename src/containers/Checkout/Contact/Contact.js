import React, { Component } from 'react';
import classes from './Contact.css'
import Button from '../../../components/Button/Button';
import axios from '../../../axios-order';
import Spinnner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class Contact extends Component {


    constructor() {
        super()

        this.state = {
            loading: false,
            orderForm: null
        }

        this.getFormState = this.getFormState.bind(this)
    }


    componentDidMount() {
        this.getFormState(['name', 'street', 'zipcode', 'country', 'email', 'deliveryMethod'])
    }

    getFormState(arr) {

        const data = arr;
        console.log(data)
        let input = []
        for (let i in data) {
            if (data[i] === 'deliveryMethod') {
                input.push({ id: data[i], elementType: 'select', configType: { options:[{value:'fastest',displayVlue:'Fastest'},{value:'cheapest',displayVlue:'Cheapest'}], placeholder: 'Delivery Method' }, value: '' })
            } else if(data[i]==='email') {
                input.push({ id: data[i], elementType: 'input', configType: { type: 'email', placeholder: data[i] }, value: '' })
            }else{
                input.push({ id: data[i], elementType: 'input', configType: { type: 'text', placeholder: data[i] }, value: '' })
            }

        }
        const convertArrayToObject = (array, key) => {
            const initialValue = {};
            return array.reduce((obj, item) => {
                return {
                    ...obj,
                    [item[key]]: item,
                };
            }, initialValue);
        };
        const form = convertArrayToObject(input, 'id')
        this.setState({ orderForm: form })    

    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        let orderObject={}
        for(let key in this.state.orderForm){
            orderObject[key]=this.state.orderForm[key].value
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            order:orderObject
        }
        axios.post('/orders.json', order).then(res => {
            this.setState({ loading: false });
            this.props.history.push('/')
        }).catch(err => {
            console.log("from catch")
            this.setState({ loading: false });
        })
    }
    inputHandler=(event,id)=>{
        console.log(event.target.value)
        console.log(this.state.orderForm[id])
        const orderFormClone={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...orderFormClone[id]
        }
        updatedFormElement.value=event.target.value;
        orderFormClone[id]=updatedFormElement;
        this.setState({orderForm:orderFormClone})
        console.log(this.state.orderForm)
    }
    render() {
        console.log(this.state.orderForm)
        let formArrayElement=[]
        for(let key in this.state.orderForm){
            formArrayElement.push({
                id:key,
                config:this.state.orderForm[key]
            })
          
        }
        let output = (<form>
            {formArrayElement.map(formElement=>(
                <Input key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.configType}
                        value={formElement.config.value}
                        clicked={(event)=>this.inputHandler(event,formElement.id)}/>
            ))}
            <Button className={classes.Input} btnType="Success" clicked={this.orderHandler}>Confirm Order</Button>
        </form>);
        if (this.state.loading) {
            output = (<Spinnner />);
        }
        return (
            <div className={classes.Contact}>
                <h2>Enter your contact data</h2>
                {output}
            </div>
        );
    }
}

export default Contact;