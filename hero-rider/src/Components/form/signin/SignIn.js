import React, { useContext, useState } from 'react';
import inputStyle from '../input.module.css';
import { useForm } from 'react-hook-form';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import postData from '../../../hooks/postData';
import PrimaryButton from '../../Button/Primary-Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { createRfcTime } from '../../../hooks/rfc.time.format';
import { UserData } from '../../../context/User.Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {

    const [visibleBool, setVisibleBool] = useState(false);

    const {userActiveData,load,notifySuccess,notifyError,setUserActiveData} = useContext(UserData);

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    if(load) return;

    if(userActiveData) return <Navigate to={`/`} replace={true}></Navigate>;

    const onSubmit = async (data) => {
        try {
            const userInfo = await postData(`/login`,data);
            document.cookie =`auth_jwt=Bearer ${userInfo.authroizationToken}; expire=${createRfcTime(30)} path=/`;
            notifySuccess(`Login Success`)
            .then(() => setUserActiveData(userInfo));

        } catch (error) {
            notifyError(error.response.data.message)
            .then(() => {});
        }
    };

    return (
        <>
            <section className={`flex bg-white justify-center items-center min-h-screen`}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={`my-2`}>
                        <label className={inputStyle[`input-label`]}>Full Name</label>
                        <input placeholder={`Enter Your Full Name`} type={'text'} className={inputStyle[`input-feild`]} {...register(`fullName`,)} required={true} />
                    </div>

                    <div className={`my-2`}>
                        <label className={inputStyle[`input-label`]}>Email</label>
                        <input placeholder={`Enter Your Email`} type={'email'} className={inputStyle[`input-feild`]} {...register(`email`,)} required={true} />
                    </div>

                    <div className={`my-2`}>
                        <label className={inputStyle[`input-label`]}>Password</label>
                        <div className={`relative`}>
                            <input placeholder={`Enter Your Password`} type={visibleBool ? 'text' : 'password'} className={inputStyle[`input-feild`]} {...register('password',)} minLength='6' required={true} />

                            <div onClick={() => setVisibleBool(!visibleBool)} className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2`}>
                                {
                                    visibleBool
                                        ?
                                        <IoIosEyeOff size={18} />
                                        :
                                        <IoIosEye size={18} />
                                }
                            </div>

                        </div>

                    </div>

                    <div className={`my-2`}>
                        <PrimaryButton middle={true}>LOG IN</PrimaryButton>
                    </div>

                </form>
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

SignIn.propTypes = {}
export default SignIn;