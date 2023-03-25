import React, { useContext, useState } from 'react';
import inputStyle from '../input.module.css';
import { useForm } from 'react-hook-form';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import postData from '../../../hooks/postData';
import PrimaryButton from '../../Button/Primary-Button';
import { Link, Navigate, } from 'react-router-dom';
import { createRfcTime } from '../../../hooks/rfc.time.format';
import { UserData } from '../../../context/User.Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../Button/Loading.Button';

function SignIn() {

    const [visibleBool, setVisibleBool] = useState(false);

    const [loginBool, setLoginBool] = useState(false);

    const {userActiveData,load,notifySuccess,notifyError,setUserActiveData} = useContext(UserData);

    const { register, handleSubmit } = useForm();

    if(load) return;

    if(userActiveData) return <Navigate to={`/`} replace={true}></Navigate>;

    const onSubmit = async (data) => {
        try {
            setLoginBool(true);
            const userInfo = await postData(`/login`,data);
            document.cookie =`auth_jwt=Bearer ${userInfo.authroizationToken}; expire=${createRfcTime(30)} path=/`;
            notifySuccess(`Login Success`)
            .then(() => {
                setUserActiveData(userInfo);
                setLoginBool(false);
            });

        } catch (error) {
            notifyError(error.response.data.message)
            .then(() => setLoginBool(false));
        }
    };

    return (
        <>
            <section className={`flex justify-center items-center min-h-screen`}>
                <form className={`shadow w-[80%] sm:w-[50%] md:-[70%] lg:w-[25%] px-8 py-5 md:px-8 bg-white rounded-2xl`} onSubmit={handleSubmit(onSubmit)}>

                    <h3 className={`text-center text-purple-600 font-bold text-3xl`}>Login</h3>
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

                    <div className={`text-right font-medium text-sm`}>
                        Click here <Link to={`/signup`} className={`text-purple-600 underline`}>Sign Up</Link>
                    </div>

                    <div className={`my-2`}>
                        {
                            loginBool
                            ?
                            <LoadingButton middle={true}>Wait...</LoadingButton>
                            :
                            <PrimaryButton middle={true}>LOG IN</PrimaryButton>
                        }
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