import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import routes from './constants/routes';

const App = () => {
  const stripePromise = loadStripe(
    'pk_test_51IbuRrAlFqtdQ1Jg64Y37ZMFqY800U2V3QvnwbNYOXWHADJVUQgQZ0s88BoLtKNNQ8HmZpTF7OEUp1USv6QFZUCv00vHzuads9'
  );
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className='App'>
        <div className='bg-top' />
        <div className='bg-bottom' />
          <Switch>
            {Object.values(routes).map((route) => (
              <Route
                exact
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </Elements>

  );
}

export default App;
