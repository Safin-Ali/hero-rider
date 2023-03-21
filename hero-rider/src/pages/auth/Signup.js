import React from 'react';
import { useParams } from 'react-router-dom';
import LearnerRegForm from '../../Components/form/signup/Learner-Reg-Form';
import RiderRegForm from '../../Components/form/signup/Rider-Reg-Form';

function Signup() {

  const { type } = useParams();
  console.log(type)
  if (type === 'rider') return <RiderRegForm></RiderRegForm>;
  if (type === 'learner') return <LearnerRegForm></LearnerRegForm>;
};

export default Signup;