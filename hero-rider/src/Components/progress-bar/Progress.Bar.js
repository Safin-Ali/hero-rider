import React from 'react';
import PropTypes  from 'prop-types';

function ProgressBar({percent}) {

    return (
        <div>
            <div className="mb-1 text-base font-medium ">Complete</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-purple-600 h-3 rounded-full" style={{width:`${percent || 10}%`}}></div>
            </div>
        </div>
    );
};

ProgressBar.defaultProps = {
    percent: 0
}
ProgressBar.propTypes = {
    percent: PropTypes.number
}
export default ProgressBar;