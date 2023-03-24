import React from 'react';
import PropTypes from 'prop-types';
import smallToolTip from './tooltip.module.css'

function SmallToolTip({
    children,
    callback = () => {},
    visible = false
}) {

    return (
        <>
        <div onClick={callback} className={`absolute z-[2] bottom-[-120%] left-[60%] transform -translate-x-1/2 duration-200 ${visible ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            <div className={smallToolTip['small-tooltip']}>
                    {children}
                    <span className={smallToolTip['small-tooltip-arrow']}></span>
                </div>
        </div>
        </>
    );
};

SmallToolTip.propTypes = {
    children: PropTypes.string
}
export default SmallToolTip;