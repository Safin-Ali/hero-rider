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

  const { userActiveData, notifySuccess, notifyError,notifyWarning } = useContext(UserData);
  const [processing, setProcessing] = useState(false);

  const {
    amount,
    text,
    prodId,
    callback,
    visible,
    closeModal
  } = props.info;

  const { register, handleSubmit, reset } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const authToken = getAuthToken();

  const handleFormSubmit = async (e) => {

    if(e.validate !== 'CONFIRM') return notifyWarning(`Please Type CONFIRM`)

    setProcessing(true);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setProcessing(false)
      notifyError(error.message)
        .then(() => setProcessing(false));
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
        notifyError(`Payment failed ${payload.error.message}`)
          .then(() => setProcessing(false));
      } else {

        instance.patch(`/update-user`, {
          packagesId: prodId,
          email: userActiveData?.userEmail
        }, { headers: { authorization: authToken } })
          .then(res => {
            if (res.data.acknowledge) {
              setProcessing(false);

              notifySuccess(`Payment Successfull. Thank You`)
                .then(() => {
                  handleModalClose();
                  return callback()
                })

            };
          })
          .catch(error => {
            notifyError(error.response.data.message)
              .then(() => setProcessing(false));
          })
      }
    };
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
        <div className={`relative w-full h-auto`}>

          <div style={{ backgroundImage: `url(https://png.pngtree.com/background/20220714/original/pngtree-ui-material-dotted-line-white-vector-background-picture-image_1613012.jpg)`}}
          className="bg-cover rounded-t-3xl"
          >
            <div className={`w-3/5 mx-auto h-fit bg-cover`}>
              <img src="https://i.ibb.co/b7F49r3/concept-credit-card-payment-landing-page-52683-24923-removebg-preview.png" alt="vector_payment" />
            </div>
          </div>

          <div className={`w-[70%] mt-3 mx-auto h-full`}>
            <h4 className={`text-center font-semibold capitalize text-xl`}>{text}</h4>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

              <div className={`my-3`}>
                <input placeholder={`Amount`} className={paymentModalStyle[`input-feild`]} type="text" value={amount} {...register(`amount`, { required: true })} />
              </div>

              <div className={`my-3`}>

                <label className={paymentModalStyle[`input-label`]}> please type <span className={`bg-zinc-200 rounded-full select-none px-2 py-0.5`}>CONFIRM</span></label>

                <input placeholder={`Type`} className={paymentModalStyle[`input-feild`]} type="text" {...register(`validate`, { required: true, })} autoComplete="off" />
              </div>

              <div className={`my-3`}>
                <CardElement className={paymentModalStyle['payment-feild']}></CardElement>
              </div>
              {
                processing ?
                  <LoadingButton middle={true}></LoadingButton>
                  : <PrimaryButton middle={true}>PAYMENT</PrimaryButton>
              }
            </form>
          </div>

            <div onClick={handleModalClose} className={`absolute cursor-pointer text-white bg-red-500/90 border p-1.5 rounded-2xl right-5 top-5`}>
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