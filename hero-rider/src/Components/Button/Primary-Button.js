import React from 'react';
import btnStyle from './btn.module.css';
import PropTypes  from 'prop-types';

function PrimaryButton ({
    children,
    className,
    onClick,
    middle
}) {

 return (
    <div className={`my-2 flex ${middle && 'justify-center'}`}>
        <button onClick={onClick} className={`${btnStyle['primary-btn']} ${className}`}>{children}</button>
    </div>
  );
};

PrimaryButton.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    middle: PropTypes.bool
}

PrimaryButton.defaultProps = {
    children: 'Button',
    className: '',
    onClick: ()=>{},
    middle: false
}


export default PrimaryButton;