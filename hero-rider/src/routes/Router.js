import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import RegForm from '../Components/form/signup/Reg-Form';
import SignUpOption from '../pages/auth/Type-Option-Box';

function Router () {

 return (
    <BrowserRouter>
        <Routes>
            <Route path={`/signup`} element={<SignUpOption/>}/>
            <Route path={`/signup/:type`} element={<RegForm/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default Router;