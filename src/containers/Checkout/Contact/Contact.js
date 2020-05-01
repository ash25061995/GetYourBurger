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
            orderForm: null,
            isFormValid:false
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
                input.push({ id: data[i], elementType: 'select', configType: { options:[{value:'fastest',displayVlue:'Fastest'},{value:'cheapest',displayVlue:'Cheapest'}], placeholder: 'Delivery Method' }, value: 'Fastest',validation:{isRequired:true},valid:true,touched:false })
            } else if(data[i]==='email') {
                input.push({ id: data[i], elementType: 'input', configType: { type: 'email', placeholder: data[i] }, value: '',validation:{isRequired:true},valid:false,touched:false })
            }else if(data[i]==='zipcode'){
                input.push({ id: data[i], elementType: 'input', configType: { type: 'text', placeholder: data[i] }, value: '',validation:{isRequired:true,minLength:5,maxLength:6},valid:false,touched:false })
            }else{
                input.push({ id: data[i], elementType: 'input', configType: { type: 'text', placeholder: data[i] }, value: '',validation:{isRequired:true},valid:false,touched:false })
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
        let isValid=false;
        for(let key in this.state.orderForm){
            if(!this.state.orderForm[key].valid){
                isValid=false
                break
            }else{
                isValid=true
            }
        }
        if(isValid){
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
        }else{
            alert("field is required")
            this.setState({ loading: false });
        }
       
    }
    checkValidity=(value,rule,id)=>{
        let isValid=true;
        if(rule.isRequired){
            isValid=value.trim() !==0 && isValid
        }
       if(rule.minLength){
            isValid=value.length>=rule.minLength && isValid
       }
       if(rule.maxLength){
        isValid=value.length<=rule.maxLength && isValid
       }
       if(id==='name'){
         isValid=/^[a-zA-Z\s]+$/.test(value) && isValid
       }
       if(id==='zipcode'){
           isValid=(/^([0-9]{1,})$/.test(value)) && isValid
       }
       if(id==='country'){
        isValid=isValid=/^[a-zA-Z\s]+$/.test(value) && isValid
      }
      if(id==='email'){
          isValid=/\S+@\S+\.\S+/.test(value) && isValid
      }
               

        return isValid
    }
    inputHandler=(event,id)=>{

        const orderFormClone={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...orderFormClone[id]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.touched=true
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation,id)
        let isValid=true;
        orderFormClone[id]=updatedFormElement;
        for(let id in orderFormClone){
            isValid=orderFormClone[id].valid && isValid
        }

        this.setState({orderForm:orderFormClone, isFormValid:isValid})
    }
    render() {
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
                        clicked={(event)=>this.inputHandler(event,formElement.id)}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}/>
            ))}
            <Button className={classes.Input} 
            btnType="Success" 
            clicked={this.orderHandler} 
            disabled={!this.state.isFormValid}>Confirm Order</Button>
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