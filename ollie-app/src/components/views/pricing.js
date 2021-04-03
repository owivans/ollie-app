import React, { Component } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import TransactionModal from '../transactionModal/transactionModal';

class PricingView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <TransactionModal />
    )
  };
};

export default PricingView;
