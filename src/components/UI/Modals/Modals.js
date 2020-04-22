import React, { Component } from 'react';
import classes from './Modals.css'
import Aux from '../../../hoc/Aux/Aux'
import BackDrop from '../BackDrop/BackDrop'

class Modals extends Component{
    // constructor(){
    //     super()
    //     console.log("constructor modal")
    // }
    // static getDerivedStateFromProps(){
    //     console.log("derived state")
    // }

    // componentWillMount(){
    //     console.log("will mount modal")
    // }
    // componentDidMount(){
    //     console.log("Did Mount modal")
    // }
    shouldComponentUpdate(prevProp){
        console.log("should component")
        return prevProp.show!==this.props.show||prevProp.children!==this.props.children;
    }
    // componentWillUpdate(){
    //     console.log("will update modal")
    // }
    // componentDidUpdate(){
    //     console.log("did update modal")
    // }
    // componentWillUnmount(){
    //     console.log("will unmount modal")
    // }
    render(){
        // console.log("render modal")
        // console.log("error",this.props.error)
        return(
            <Aux>
            <BackDrop show={this.props.show} clicked={this.props.clicked} error={this.props.error}/>
            <div className={classes.Modal}
                style={
                    {transform:this.props.show&&this.props.error?'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show&&this.props.error?'1':'0'}
                }
            >
            {this.props.children}
        </div>
        </Aux>
        )
    }
}
        
        

   



export default Modals;