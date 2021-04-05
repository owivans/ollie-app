import {
  CardExpiryElement,
  CardNumberElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react"

import { handleError, getBrandCard } from './helper';

import './style.css';

const CheckoutForm = ({
  handleModal,
  isOpen,
  handleSubmit,
  isLoading,
  handleCardNumber,
  isErrorNumberCard,
  brandCard,
  handleFullName,
  fullName,
  dataToPayment,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModal} size={'4xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Payment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading && 'loading....'}
            <div className='main-content'>
              <div className='main-content__card-interaction'>
                <div className='card'>
                  <div className='card__ship' />
                  <div className='card__number'>XXXX XXXX XXXX XXXX</div>
                  <div className='card__brand'>
                    <img
                      src={getBrandCard[brandCard]}
                      height='30px'
                      alt={getBrandCard[brandCard]}
                    />
                  </div>
                  <div className='card__name'>{fullName}</div>
                </div>
              </div>
              <div className='main-details'>
                <form onSubmit={(event) => handleSubmit(event)}>
                  <div className='main-details__row-name'>
                    <label>
                      Full name
                      <Input
                        name='fullName'
                        variant="filled"
                        onChange={({ target }) => handleFullName(target.value)}
                      />
                    </label>
                  </div>
                  <div className='main-details__row-name'>
                    <label>
                      Card Number
                      <CardNumberElement
                        onChange={({
                          brand,
                          error
                        }) => handleCardNumber({ brand, error })
                      }
                      />
                      {isErrorNumberCard ? handleError(isErrorNumberCard.message) : null}
                    </label>
                  </div>
                  <div className='main-details__row-card'>
                    <label>
                      Expiration date
                    <CardExpiryElement />
                    </label>
                    <label>
                      CVC
                    <CardCvcElement />
                    </label>
                  </div>
                  <div className='button-modal-main'>
                    <button className='btn-primary'>
                      <span className='light-text'>Buy</span> {`$${dataToPayment?.price || 0.00}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
};

export default CheckoutForm;
