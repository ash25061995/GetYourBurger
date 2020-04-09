import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'}
]

const BuildControls=(props)=>(
    <div className={classes.BuildControls}> 
    <p>Price: INR <strong>{props.price}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} 
            label={ctrl.label}
            lessClickHandler={()=>props.lessClickHandler(ctrl.type)}
            moreClickHandler={()=>props.moreClickHandler(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button onClick={props.ordered} disabled={!props.purchasable} className={classes.OrderButton}>Order Now</button>
    </div>
);

export default BuildControls;