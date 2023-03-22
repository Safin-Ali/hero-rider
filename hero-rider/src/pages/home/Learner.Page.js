import React from 'react';
import PropTypes from 'prop-types';
import getAuthToken from '../../hooks/get.Auth.Token';
import useGetData from '../../hooks/use.get.data';
import CoursePackageCard from '../../Components/card/Course.Package.Card';
import learnerStyle from './style.module.css';

function LearnerPage() {

  const authToken = getAuthToken();

  const [data] = useGetData(`/leasson-packages`, { authorization: authToken });

  return (
    <section className={`container mx-3 md:mx-auto my-5`}>
      <div className={learnerStyle['learner-container']}>
        {
          data?.map(obj => <CoursePackageCard key={obj._id} data={obj}></CoursePackageCard>)
        }
      </div>
    </section>
  );
};

LearnerPage.propTypes = {}
export default LearnerPage;