import React from 'react';

import membershipTypes from '../../constants/membershipTypes';

import './style.css';

const Membership = ({ currentMembershipType, handleModal, stripe }) => {
  const dataMembership = membershipTypes[currentMembershipType];
  if (dataMembership && dataMembership.length < 1) {
    return 'not results'
  }
  return (
    <div className='row-membership-content'>
      {dataMembership.map(({ name, price, capacity, usersAllowed, sendUp }) => {
        console.log(Number(price), 'Number(price)')
        return (
          <div className={`main-content-memebership${name === 'Professional' ? '-alternative-card' : '-card'}`}>
            <div className='name'>{name}</div>
            <div className='price'> <span className='currency'>$</span> {price} </div>
            <div className='description-content'>
              <div className='item'> {`${capacity}`} Storage </div>
              <div className='item'> {`${usersAllowed}`} users Allowed </div>
              <div className='item'> Send up to {`${sendUp}`} </div>
            </div>
            <div className='main-content-memebership__buy'>
              <button
                disabled={!stripe}
                className='btn-primary'
                onClick={() => handleModal({
                  name,
                  price,
                  currentMembershipType
                })}
              >
                BUY MEMBERSHIP
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Membership;
