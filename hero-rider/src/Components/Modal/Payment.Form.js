import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import paymentModalStyle from './payment-modal.module.css';
import PrimaryButton from '../Button/Primary-Button';
import { IoMdClose } from 'react-icons/io';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import postData from '../../hooks/postData';
import { UserData } from '../../context/User.Context';
import getAuthToken from '../../hooks/get.Auth.Token';
import LoadingButton from '../Button/Loading.Button';
import instance from '../../api/axios.config';


function PaymentForm(props) {

  const { userActiveData } = useContext(UserData);
  const [processing, setProcessing] = useState(false);
  const [success, setSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const {
    amount,
    text,
    prodId,
    callback,
    visible,
    closeModal
  } = props.info;

  const { register, handleSubmit,reset } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const authToken = getAuthToken();

  const handleFormSubmit = async () => {

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setProcessing(false)
      setError(error.message);
    } else {

      const { clientSecret } = await postData('/payment-intent', {
        buyerEmail: userActiveData?.userEmail,
        packagesId: prodId,
        amount: amount
      }, { authorization: authToken });

      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {

        instance.patch(`/update-user`,{
          packagesId: prodId,
          email: userActiveData?.userEmail
        },{headers: {authorization: authToken}})
        .then(res => {
          if(res.data.acknowledge) {
            setError(null);
            setProcessing(false);
            handleModalClose();
            return callback()
          };
        })
        .catch(error => {
          setError(error.response.data.message)
          return setProcessing(false);
        })
      }
    }
  };

  function handleModalClose() {
    reset()
    return closeModal({
      type: 'inactive',
      payload: {
        prodId: '',
        amount: 0,
        text: ``,
      }

    })
  };

  return (
    <>
      <div className={`${paymentModalStyle['modal-container']} ${visible ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className={`relative w-full h-full`}>
          <div className={`w-[70%] mx-auto ${paymentModalStyle['position-center']}`}>
            <h4 className={`text-center font-semibold capitalize text-xl`}>{text}</h4>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

              <div className={`my-3`}>
                <input placeholder={`Amount`} className={paymentModalStyle[`input-feild`]} type="text" value={amount} {...register(`amount`, { required: true })} />
              </div>

              <div className={`my-3`}>

                <label className={paymentModalStyle[`input-label`]}> please type <span className={`bg-zinc-200 rounded-full select-none px-2 py-0.5`}>confirm</span></label>

                <input placeholder={`Type`} className={paymentModalStyle[`input-feild`]} type="text" {...register(`validate`, { required: true, })} />
              </div>

              <div className={`my-3`}>
                <CardElement className={paymentModalStyle['payment-feild']}></CardElement>
              </div>
              {
                processing ?
                  <LoadingButton middle={true}></LoadingButton>
                  : <PrimaryButton middle={true}>PAY</PrimaryButton>
              }
            </form>
          </div>
          <div onClick={handleModalClose} className={`absolute border cursor-pointer p-1.5 rounded-2xl right-5 top-5`}>
            <IoMdClose size={25}></IoMdClose>
          </div>
        </div>
      </div>
      <div className={`${paymentModalStyle['modal-blur']} ${visible ? 'visible opacity-100' : 'invisible opacity-0'}`}></div>
    </>
  );
};

PaymentForm.propTypes = {}
export default PaymentForm;