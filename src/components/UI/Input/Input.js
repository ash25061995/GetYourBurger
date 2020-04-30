import React from 'react';
import classes from './Input.css';

const Input = props => {
    let InputElement=null;
    switch(props.elementType){
        case('input'):
        InputElement=<input  className={classes.InputElement} {...props.elementConfig} {...props.value} onChange={props.clicked}/>
        break;
        case('textArea'):
        InputElement=<textarea className={classes.InputElement} {...props.elementConfig} {...props.value} onChange={props.clicked}/>
        break;
        case('select'):
        InputElement=(<select className={classes.InputElement} {...props.elementConfig} {...props.value} onChange={props.clicked}>
            <option value={props.elementConfig.placeholder}>{props.elementConfig.placeholder}</option>
            {props.elementConfig.options.map(el=>(
                <option value={el.value}>{el.displayVlue}</option>
            ))}
            </select>)
        break;
        default:
            InputElement=<input className={classes.InputElement} {...props.elementConfig} {...props.value} onChange={props.clicked}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
        </div>
    );
};

export default Input;