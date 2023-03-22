import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCookieValue } from '../hooks/find-cookie';
import instance from '../api/axios.config';
import { createRfcTime } from '../hooks/rfc.time.format';

export const UserData = createContext();

function UserContext ({children}) {

  const [userActiveData,setUserActiveData] = useState(null);
  const [load,setLoaded] = useState(true);

  const authCookie = document.cookie;

  const handleLogout = () => {
    document.cookie =`auth_jwt=; expire=${createRfcTime(-7)} path=/;`;
    return setUserActiveData(null)
  }

  const authorization = getCookieValue(authCookie,`auth_jwt`);

  console.log(userActiveData)

  useEffect(()=>{
    instance.get(`/user-persist`,{headers: {authorization}})
    .then(res => {
      setUserActiveData(res.data);
      return setLoaded(false);
    })
    .catch(err => {
      console.log(err.response.data.message);
      return setLoaded(false);
    })
    return () => {}
  },[]);

  const userDataObj = {
    userActiveData,
    setUserActiveData,
    load,
    handleLogout
  }

 return (
  <UserData.Provider value={userDataObj}>
    {children}
  </UserData.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.element
}
export default UserContext;