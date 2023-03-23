import React, { useContext, useReducer, useState } from 'react';
import getAuthToken from '../../hooks/get.Auth.Token';
import useGetData from '../../hooks/use.get.data';
import CoursePackageCard from '../../Components/card/Course.Package.Card';
import learnerStyle from './style.module.css';
import PaymentModal from '../../Components/Modal/Payment.Modal';
import { UserData } from '../../context/User.Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LearnerPage() {

  const authToken = getAuthToken();

  const {handleRerender,render} = useContext(UserData)

  const intialState = {
    visible: false,
    prodId:'',
    amount: 0,
    text: ''
  };

  const modalReducer = (state,action) => {
    if(action.type === 'active') {
      return {...state,
        visible: true,
        prodId: action.payload.prodId,
        amount: action.payload.amount,
        text: action.payload.text,
      };
    };
    return {
      ...state,
      visible: false,
      prodId: '',
      amount: 0,
      text: '',
    }
  };

  const [modalState, modalDispatch] = useReducer(modalReducer,intialState);

  const [data] = useGetData(`/leasson-packages`, { authorization: authToken },render);

  return (
    <>
      <section className={`container mx-3 md:mx-auto my-5`}>
        <div className={learnerStyle['learner-container']}>
          {
            data?.map(obj => <CoursePackageCard callback={modalDispatch} key={obj._id} data={obj}></CoursePackageCard>)
          }
        </div>
      </section>
      <PaymentModal callback={handleRerender} closeModal={modalDispatch} amount={modalState.amount} text={modalState.text} prodId={modalState.prodId} visible={modalState.visible}></PaymentModal>
      <ToastContainer
        position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
      />
    </>
  );
};

LearnerPage.propTypes = {}
export default LearnerPage;