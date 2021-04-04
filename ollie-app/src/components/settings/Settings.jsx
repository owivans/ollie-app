import React from 'react';
import { Switch } from "@chakra-ui/react"

import './style.css'

const Settings = ({ handleMembershipType, isChecked}) => {
  return (
    <div className='main-settings'>
      <div className='settings-title'>Our Pricing</div>
      <div className='settings-content'>
        <div className='settings-content__label'>Annually</div>
        <Switch
          id="email-alerts"
          colorScheme='purple'
          value={isChecked}
          onChange={(event) => handleMembershipType(event)}
        />
        <div className='settings-content__label'>Monthly</div>
      </div>
    </div>
  )
};

export default Settings;
