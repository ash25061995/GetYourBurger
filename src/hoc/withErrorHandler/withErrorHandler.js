import React, { Component } from 'react';
import Modals from '../../components/UI/Modals/Modals';
import Aux from '../Aux/Aux';
const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null

        }
        componentWillMount=()=>{
            this.requestInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            },error=>{
                console.log("req interceptor",error);
                return Promise.reject(error)
            })
            this.responseInterceptor=axios.interceptors.response.use(res=>{
                console.log("interceptor: res", res)
                return res;
            },error=>{
                console.log("interceptor: error", error)
                this.setState({error:error});
                return Promise.reject(error)
            })
        }
        componentWillUnmount=()=>{
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        modalHandler=()=>{
            this.setState({error:true})
        }
        render(){
            return( 
                <Aux>
                    <Modals show={this.state.error} clicked={this.errorConfirmedHandler} error={this.modalHandler}>{this.state.error?this.state.error.message:null}</Modals>
                    <WrappedComponent {...this.props}/>
                </Aux>
            
                );
        }
            
    }
}

export default withErrorHandler;