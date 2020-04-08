import React from 'react';
import classes from './BuildControl.css'

const BuildControl=(props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.lessClickHandler} className={classes.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.moreClickHandler} className={classes.More}>More</button>
    </div>
);

export default BuildControl;