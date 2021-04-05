import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement
} from '@stripe/react-stripe-js';
import axios from 'axios';

import {
  useToast
} from "@chakra-ui/react"

import MembershipCard from '../membershipCard/membershipCard';
import TransactionModal from '../transactionModal/transactionModal';
import Settings from '../settings/Settings';

const PricingView = () => {
  const [isOpen, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [currentMembershipType, setCurrentMembershipType] = useState('annually');
  const [dataToPayment, setDataToPayment] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isBrandCard, setBrandCard] = useState('unknow');
  const [isErrorNumberCard, setErrorNumberCard] = useState(null);
  const [isFullName, setFullName] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast()

  const handleModal = (dataMembership) => {
    setOpen(!isOpen);
    setDataToPayment(dataMembership)
    console.log(dataMembership)
  };

  const handleCardNumber = ({ brand, error}) => {
    setBrandCard(brand);
    setErrorNumberCard(error);
  };

  const handleFullName = (value) => {
    setFullName(value);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const { name, price, currentMembershipType } = dataToPayment;
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name,
      },
    })

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post('http://localhost:3000/checkoutPayment/membershipType', {
          id,
          amount: Number(price) * 100,
          description: `${name} membership ${currentMembershipType}`,
        });
        setLoading(false)
        setOpen(false);
        toast({
          title: 'Payment successfull',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        })
        console.log(data)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
      elements.getElement(cardElement).clear();
    }
  };

  const handleMembershipType = () => {
    setChecked(!isChecked);
    const membershipType = isChecked === true ? 'annually' : 'monthly';
    setCurrentMembershipType(membershipType);
  };

  return (
    <>
      <TransactionModal
        handleModal={handleModal}
        isOpen={isOpen}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleCardNumber={handleCardNumber}
        isErrorNumberCard={isErrorNumberCard}
        brandCard={isBrandCard}
        handleFullName={handleFullName}
        fullName={isFullName}
        dataToPayment={dataToPayment}
      />
      <Settings
        handleMembershipType={handleMembershipType}
        isChecked={isChecked}
      />
      <MembershipCard
        currentMembershipType={currentMembershipType}
        handleModal={handleModal}
        stripe={stripe}
      />
    </>
  )
};

export default PricingView;
