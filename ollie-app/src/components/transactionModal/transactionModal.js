import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Lorem,
} from "@chakra-ui/react"

const CheckoutForm = ({
  handleModal,
  isOpen,
}) => {

  const stripePromise = loadStripe('pk_test_51IbuRrAlFqtdQ1Jg64Y37ZMFqY800U2V3QvnwbNYOXWHADJVUQgQZ0s88BoLtKNNQ8HmZpTF7OEUp1USv6QFZUCv00vHzuads9');


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
    <>
     <Modal isOpen={isOpen} onClose={handleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <CardElement/>
          <form onSubmit={handleSubmit}>
            <button>Buy</button>
          </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModal}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    <Button onClick={handleModal}>Open Modal</Button>

    </>
  )
};

export default CheckoutForm;
