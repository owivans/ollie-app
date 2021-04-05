import visa from '../../assets/visa-01.svg';
import mastercard from '../../assets/mastercard-01.svg';

const handleError = (message) => <div className='error-message'>{message}</div>;

const getBrandCard = {
  visa,
  mastercard,
  unknow:'',
}
export { getBrandCard, handleError };
