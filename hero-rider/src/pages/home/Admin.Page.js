import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashTable from '../../Components/Table/Dash.Table';
import { UserData } from '../../context/User.Context';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../hooks/use.get.data';
import getAuthToken from '../../hooks/get.Auth.Token';
import PaginationWrapper from '../../Components/pagination/Pagination.Wrapper';
import LoaderAnim from '../../Components/Loader/Loader.Anim';

function AdminPage() {

  const { userActiveData } = useContext(UserData);
  const [queryObj, setQueryObj] = useState({
    count: 0,
    ageFrom: 0,
    ageTo: 0,
    search: ''
  });


  const [reFetch, setReFetch] = useState(false);

  const navigate = useNavigate();

  const authToken = getAuthToken();

  const queryURL = `/admin/get-users?count=${queryObj.count}&ageFrom=${queryObj.ageFrom}&ageTo=${queryObj.ageTo}&search=${queryObj.search}`

  const [usersData] = useGetData(queryURL, { authorization: authToken }, reFetch);

  const handlepagination = (num) => {
    setQueryObj({ ...queryObj, count: num * 10 })
    return setReFetch(!reFetch)
  };

  if (userActiveData.userRole !== 'admin') return navigate(`/*`);

  if (!usersData) return <LoaderAnim></LoaderAnim>

  const handleAgeFilter = (e) => {
    const targetVal = e.target.value.split('-');
    const from = parseInt(targetVal[0]);
    const to = parseInt(targetVal[1]);
    setQueryObj({ ...queryObj, ageFrom: from, ageTo: to });
    return setReFetch(!reFetch);
  };

  const handleSearchFeild = (event) => {
    const value = event.target.value;
    setQueryObj({...queryObj,search:value});
    return setReFetch(!reFetch);
  }

  return (
    <>
      <section className={`container bg-gray-50 sm:rounded-t-lg shadow-md h-[calc(100vh-105px)] pb-3 overflow-hidden mx-auto my-5`}>
        <DashTable handleAgeFilter={handleAgeFilter} handleSearchFeild={handleSearchFeild} callback={() => setReFetch(!reFetch)} data={usersData?.users}></DashTable>
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
      <PaginationWrapper dataLeng={usersData?.count || 0} perPage={10} callBackFunc={handlepagination} />
    </>
  );
};
export default AdminPage;