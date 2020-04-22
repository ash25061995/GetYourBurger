import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state={
        showSideDrawer:false,
        toggleClicked:false,
        error:false
    }
    sideDrawerHandler=()=>{
        this.setState({showSideDrawer:false})
        this.setState({error:true})
    }
    toggleClickedHandler=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer,error:true}
        })
    }
    render(){
        return (
            <Aux>
                <Toolbar clicked={this.toggleClickedHandler}/>
                <SideDrawer open={this.sideDrawerHandler} closed={this.state.showSideDrawer} error={this.state.error}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
            )
    }
     
}


export default Layout;