import React, { Component } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import MembershipCard from '../membershipCard/membershipCard';
import TransactionModal from '../transactionModal/transactionModal';
import Settings from '../settings/Settings';

class PricingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isChecked: false,
      currentMembershipType: 'annually',
    };
  }

  handleModal = () => {
    const { isOpen } = this.state;
    this.setState({isOpen: !isOpen})
  };

  handleMembershipType = (event) => {
    const { isChecked } = this.state;
    const currentMembershipType = isChecked  === true ? 'monthly' : 'annually';
    this.setState({ isChecked: !isChecked, currentMembershipType })
  };

  render () {
    const { isOpen, isChecked, currentMembershipType } = this.state;
    return (
      <div>
        <TransactionModal handleModal={this.handleModal} isOpen={isOpen} />
        <Settings
          handleMembershipType={this.handleMembershipType}
          isChecked={isChecked}
        />
        <MembershipCard
          currentMembershipType={currentMembershipType}
          handleModal={this.handleModal}
        />
      </div>
    )
  };
};

export default PricingView;
