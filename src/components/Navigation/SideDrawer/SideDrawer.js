import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../../UI/BackDrop/BackDrop';


const SideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer,classes.Open];
    if(props.open===false){
        attachedClasses=[classes.SideDrawer,classes.Close];
    }
    return (
        <Aux>
            <button>Menu</button>
            <BackDrop show={props.closed} clicked={props.open} error={props.error}/>
            {props.closed?<div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                        <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>:null}
            
        </Aux>

    );
};

export default SideDrawer;