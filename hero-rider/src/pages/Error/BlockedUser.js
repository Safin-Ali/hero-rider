import React from 'react';

function BlockedUser () {

 return (
    <section className={`flex justify-center items-center h-screen`}>
        <div className={`w-[70%] shadow-md rounded-md`}>
            <img src="https://i.ibb.co/fMBQyqw/Untitled.png" className={`rounded-lg`} alt="Unauthorized_Banner" />
        </div>
    </section>
  );
};

BlockedUser.propTypes = {}
export default BlockedUser;