import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import routes from './constants/routes';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardElement)
    })
    if(!error) {
      const { id } = paymentMethod;
      try {
        const { data} = await axios.post('http://localhost:3000/checkoutPayment/membershipType', {
          id,
          amount: 10000,
        });
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      elements.getElement(CardElement).clear();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>Buy</button>
    </form>
  )
}

const stripePromise = loadStripe('pk_test_51IbuRrAlFqtdQ1Jg64Y37ZMFqY800U2V3QvnwbNYOXWHADJVUQgQZ0s88BoLtKNNQ8HmZpTF7OEUp1USv6QFZUCv00vHzuads9');
const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardElement/>
      <CheckoutForm />
       <Router>
       <div className='App'>
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
