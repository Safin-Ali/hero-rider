import React from 'react';

function UnAuthorized () {

 return (
    <section className={`flex justify-center items-center h-screen`}>
        <div className={`w-[90%] md:w-[40%] shadow-md rounded-md`}>
            <img src="https://i.ibb.co/j4zPxNc/3828544.jpg" className={`rounded-md`} alt="Unauthorized_Banner" />
        </div>
    </section>
  );
};

UnAuthorized.propTypes = {}
export default UnAuthorized;