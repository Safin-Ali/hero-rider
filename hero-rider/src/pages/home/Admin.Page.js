import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashTable from '../../Components/Table/Dash.Table';
import { UserData } from '../../context/User.Context';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../hooks/use.get.data';
import getAuthToken from '../../hooks/get.Auth.Token';
import PaginationWrapper from '../../Components/pagination/Pagination.Wrapper';

function AdminPage() {

  const { userActiveData } = useContext(UserData);
  const [count, setCount] = useState(0);
  const [reFetch,setReFetch] = useState(false);

  const navigate = useNavigate();

  const authToken = getAuthToken();

  const [usersData] = useGetData(`/admin/get-users?count=${count}`, { authorization: authToken },reFetch);

  const handlepagination = (num) => {
    setCount(num*5)
    return setReFetch(!reFetch)
  };


  if (userActiveData.userRole !== 'admin') return navigate(`/*`);

  if(!usersData) return <p>loading</p>

  return (
    <>
      <section className={`container mx-auto my-5`}>
        <DashTable callback={()=>setReFetch(!reFetch)} data={usersData?.users}></DashTable>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <PaginationWrapper dataLeng={usersData?.count || 0} perPage={5} callBackFunc={handlepagination}/>
    </>
  );
};
export default AdminPage;