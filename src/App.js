import React from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from '../src/hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Order from '../src/containers/Order/Order'

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Order}/>
        </Switch>
      </Layout> 
    </div>
  );
}

export default App;
