import React from 'react';
import PropTypes from 'prop-types';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ReactDOM from 'react-dom';
import PaymentForm from './Payment.Form';

const portal = document.getElementById('modal');

function PaymentModal(props) {

    const loadStripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    return ReactDOM.createPortal(<Elements stripe={loadStripePromise}>
      <PaymentForm info={props}></PaymentForm>
    </Elements>, portal)
};

PaymentModal.propTypes = {
}
export default PaymentModal;