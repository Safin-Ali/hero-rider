import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../Components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

function MainPage () {

 return (
    <>
        <Navbar></Navbar>

        <main>
            <Outlet></Outlet>
        </main>
    </>
  );
};

MainPage.propTypes = {}
export default MainPage;