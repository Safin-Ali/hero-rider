import React, { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import LearnerRegForm from '../../Components/form/signup/Learner-Reg-Form';
import RiderRegForm from '../../Components/form/signup/Rider-Reg-Form';
import SignUpOption from './Type-Option-Box';

function Signup() {

  const { type } = useParams();
  console.log(type)
  if (type === 'rider') return <RiderRegForm></RiderRegForm>;
  if (type === 'learner') return <LearnerRegForm></LearnerRegForm>;
};

export default Signup;