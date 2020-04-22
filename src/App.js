import React from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from '../src/hoc/Layout/Layout'
import Checkout from './containers/Checkout/Checkout';
import {Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <Layout>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" component={Checkout}/>
      </Layout>
    </div>
  );
}

export default App;
