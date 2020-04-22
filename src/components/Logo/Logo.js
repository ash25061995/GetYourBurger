import React from 'react';
import burgerLogo from '../../assets/image/burger-logo.png';
import classes from './Logo.css'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="GetYourBurger"/>
        </div>
    );
};

export default Logo;