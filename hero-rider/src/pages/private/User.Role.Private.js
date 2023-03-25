import React, { useContext } from 'react';
import { UserData } from '../../context/User.Context';
import { admin, learner, rider } from './user.role.type';
import LearnerPage from '../home/Learner.Page';
import AdminPage from '../home/Admin.Page';
import { Navigate } from 'react-router-dom';
import LoaderAnim from '../../Components/Loader/Loader.Anim';
import BlockedUser from '../Error/BlockedUser';

function UserRolePrivate () {
    const {
        userActiveData,
        load
    } = useContext(UserData);

    if(load) return <LoaderAnim></LoaderAnim>;
    if(userActiveData?.userBlock) return <BlockedUser></BlockedUser>;
    if(userActiveData?.userRole === rider) return <p>Coming Soon</p>;
    if(userActiveData?.userRole === learner) return <LearnerPage/>;
    if(userActiveData?.userRole === admin) return <AdminPage/>;

    return <Navigate to={`/login`} replace={true}></Navigate>
};

UserRolePrivate.propTypes = {}
export default UserRolePrivate;