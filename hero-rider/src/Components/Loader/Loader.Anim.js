import React from 'react';
import loaderStyle from './loader.module.css';

function LoaderAnim () {

 return (

    <div className={loaderStyle['loader']}></div>
  );
};

LoaderAnim.propTypes = {}
export default LoaderAnim;