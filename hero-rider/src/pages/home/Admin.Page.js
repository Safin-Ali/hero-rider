import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashTable from '../../Components/Table/Dash.Table';
import { UserData } from '../../context/User.Context';
import { useNavigate } from 'react-router-dom';
import useGetData from '../../hooks/use.get.data';
import getAuthToken from '../../hooks/get.Auth.Token';

function AdminPage() {

  const {userActiveData,render,setRender} = useContext(UserData);

  const navigate = useNavigate();

  const authToken = getAuthToken();

  const [allUser] = useGetData(`/admin/get-users`,{authorization: authToken},render);

  if(userActiveData.userRole !== 'admin') return navigate(`/*`);

  return (
    <>
      <section className={`container mx-auto my-5`}>
        <DashTable data={allUser}></DashTable>
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
    </>
  );
};

AdminPage.propTypes = {}
export default AdminPage;