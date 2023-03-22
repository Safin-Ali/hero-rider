import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import SignIn from '../Components/form/signin/SignIn';
import RegForm from '../Components/form/signup/Reg-Form';
import DashTable from '../Components/Table/Dash.Table';
import SignUpOption from '../pages/auth/Type-Option-Box';
import MainPage from '../pages/main/Main.Page';
import UserRolePrivate from '../pages/private/User.Role.Private';

function Router () {

 return (
    <BrowserRouter>
        <Routes>
            <Route path={`/`} element={<MainPage/>}>
              <Route index element={<UserRolePrivate/>}/>
            </Route>
            <Route path={`/signup`} element={<SignUpOption/>}/>
            <Route path={`/login`} element={<SignIn/>}/>
            <Route path={`/signup/:type`} element={<RegForm/>}/>
            <Route path={`/dashboard`} element={<DashTable/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default Router;