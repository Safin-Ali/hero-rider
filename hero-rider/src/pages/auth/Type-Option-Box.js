import React, { memo, useState } from 'react';
import typeOptionBox from './Type-Option-Box.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SignUpOption() {

  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(`/signup/${path}`)

  const [firstOption, setFirstOption] = useState(false);
  const [secondOption, setSecondOption] = useState(false);

  return (
    <section className={typeOptionBox['container']}>

      <h3 className={`font-bold text-4xl my-4 capitalize`}>join as ... </h3>

      <div className={`flex justify-center items-center gap-10`}>

        <div onClick={() => handleNavigate('rider')} onMouseOver={() => setFirstOption(!firstOption)} onMouseLeave={() => setFirstOption(!firstOption)} className={typeOptionBox['parent-box']}>
          <div className={`w-[50%] pointer-events-none`}>
            <img className={`${firstOption ? typeOptionBox['image-white'] : ''}`} src="https://i.ibb.co/pZLfx9V/road-transport-11-512-removebg-preview.webp" alt={'rider_icon'} />
          </div>
          <div className={`pointer-events-none`}>
            <h5 className={`font-medium text-2xl uppercase my-0.5`}>rider</h5>
            <p>Join us as a rider! Sign up now to earn money while enjoying the freedom of the open road!</p>
          </div>
        </div>

        <div onClick={() => handleNavigate('learner')} onMouseOver={() => setSecondOption(!secondOption)} onMouseLeave={() => setSecondOption(!secondOption)} className={typeOptionBox['parent-box']}>
          <div className={`w-[50%] pointer-events-none`}>
            <img className={`${secondOption ? typeOptionBox['image-white'] : ''}`} src="https://i.ibb.co/kGmrHbN/2512690-removebg-preview.png" alt={'learner_icon'} />
          </div>
          <div className={`pointer-events-none`}>
            <h5 className={`font-medium text-2xl uppercase my-0.5`}>learner</h5>
            <p>Join now and unlock exclusive benefits. and become a skill full rider!</p>
          </div>
        </div>

      </div>
    </section>
  );
}


export default memo(SignUpOption);