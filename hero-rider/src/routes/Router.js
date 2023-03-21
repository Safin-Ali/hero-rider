import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import RegForm from '../Components/form/signup/Reg-Form';
import DashTable from '../Components/Table/Dash.Table';
import SignUpOption from '../pages/auth/Type-Option-Box';

function Router () {

 return (
    <BrowserRouter>
        <Routes>
            <Route path={`/signup`} element={<SignUpOption/>}/>
            <Route path={`/signup/:type`} element={<RegForm/>}/>
            <Route path={`/dashboard`} element={<DashTable/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default Router;