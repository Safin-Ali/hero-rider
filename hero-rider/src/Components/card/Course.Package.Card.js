import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cardStyle from './course-card.module.css';
import { FaPhotoVideo } from 'react-icons/fa';
import { MdOutlineAssignment, MdSell } from 'react-icons/md';
import PrimaryButton from '../Button/Primary-Button';
import ProgressBar from '../progress-bar/Progress.Bar';
import { UserData } from '../../context/User.Context';

function CoursePackageCard({ data, callback }) {

    const {userActiveData} = useContext(UserData)

    const {
        _id,
        thumbUrl,
        leasson,
        leassonLevel,
        price,
        totalAssignment,
        totalBuyPurchase,
        totalVideo,
        guiderName,
        guiderAvatar,
    } = data;

    const handlePaymentBtn = () => {
        callback({
            type: 'active',
            payload: {

                prodId: _id,

                amount: price,

                text: `${leasson} Leasson`,

            }
        });
    }

    return (
        <div className={cardStyle['card-container']}>

            {/* thumb */}
            <div style={{
                backgroundImage: `url(${thumbUrl})`
            }} className={`${cardStyle['card-thumb']}`}>
                <span>{leassonLevel} 🔥</span>
            </div>

            {/* content */}
            <div className={`my-3`}>
                <div className={cardStyle['card-info']}>

                    <div>
                        <h4>{leasson} Drive leasson</h4>
                        <span>{guiderName}</span>
                    </div>
                    <div
                        style={{ backgroundImage: `url(${guiderAvatar})` }}
                        className={cardStyle['guider-avatar']}
                    >
                    </div>

                </div>

                <div className={cardStyle['leason-info']}>
                    <div>
                        <FaPhotoVideo></FaPhotoVideo>
                        <p>{totalVideo}</p>
                    </div>

                    <div>
                        <MdOutlineAssignment></MdOutlineAssignment>
                        <p>{totalAssignment}</p>
                    </div>

                    <div>
                        <MdSell></MdSell>
                        <p>{totalBuyPurchase}</p>
                    </div>
                </div>

                <div>
                    <ProgressBar></ProgressBar>
                </div>

                <div className={`flex items-center h-full justify-around`}>
                    <h4 className={`text-3xl font-semibold`}>${price}</h4>
                    {
                        userActiveData?.courses.includes(_id)
                        ?
                        <PrimaryButton>
                            Continue
                        </PrimaryButton>
                        :
                        <PrimaryButton onClick={handlePaymentBtn}>
                            Buy Now
                        </PrimaryButton>
                    }
                </div>
            </div>


        </div>
    );
};

CoursePackageCard.propTypes = {
    data: PropTypes.object
}
export default CoursePackageCard;