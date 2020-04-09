import React from 'react';
import classes from './Modals.css'

const Modals=(props)=>(
    <div className={classes.Modal}>
        {props.children}
    </div>
)



export default Modals;