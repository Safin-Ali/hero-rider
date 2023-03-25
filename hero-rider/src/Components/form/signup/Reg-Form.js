import React, { Fragment, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../Button/Primary-Button';
import inputStyle from '../input.module.css';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import postData from '../../../hooks/postData';
import { imageUpload } from '../../../hooks/imageUpload';
import { UserData } from '../../../context/User.Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '../../Button/Loading.Button';
import LoaderAnim from '../../Loader/Loader.Anim';

function RegForm() {

  const [submitBool, setSubmitBool] = useState(false);

  const [visibleBool, setVisibleBool] = useState(false);

  const [passRequireElm, setPassRequireElm] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { userActiveData, load, notifyWarning, notifySuccess, notifyError } = useContext(UserData);

  const { type } = useParams();

  if (load) return <LoaderAnim></LoaderAnim>;

  if (userActiveData) return <Navigate to={`/`} replace={true}></Navigate>

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])[a-z\d]{6,}$/i;

  const onSubmit = async (data) => {
    try {

      setSubmitBool(true);

      const password = data.password;

      if (!passwordRegex.test(password)) {
        notifyWarning(`Password Criteria Not Match`);
        return setSubmitBool(false);
      };

      if (password !== data.confirmPassword) {
        notifyWarning(`Confirm Password Not Match`);
        return setSubmitBool(false);
      };

      const imageReadyObj = await imageUpload(data);

      await postData(`/signup?role=${type}`, imageReadyObj);

      await notifySuccess(`Registration Successful! YAY! Please Login`);

      setSubmitBool(false);
      return navigate(`/login`);

    } catch (error) {
      if (error.message === 'Already Have Account') {
        notifyWarning(`Already Have Account`);
        return setSubmitBool(false)
      }
      notifyError(error.message)
        .then(() => {
          console.log(error);
          return setSubmitBool(false);
        })
    };

  };

  const feildData = type === 'rider' ?
    [
      { type: 'text', name: 'fullName', label: 'Full name' },
      { type: 'email', name: 'email', label: 'Email' },
      { type: 'text', name: 'age', label: 'Age' },
      { type: 'text', name: 'address', label: 'Address' },
      { type: 'text', name: 'phone', label: 'Phone' },
      { type: 'file', name: 'drivingLicencePicture', label: 'Driving licence picture' },
      { type: 'text', name: 'area', label: 'Area' },
      { type: 'file', name: 'nidPicture', label: 'NID picture' },
      { type: 'file', name: 'profilePicture', label: 'Profile picture' },
      { type: 'radio', name: 'vehicleType', label: 'Vehicle Type', radioOptions: ['car', 'bike'] },
      { type: 'text', name: 'vehicleName', label: 'Vehicle Name', },
      { type: 'text', name: 'vehicleModel', label: 'Vehicle Model', },
      { type: 'text', name: 'vehiclePlate', label: 'Vehicle Number Plate', },
      { type: 'password', name: 'password', label: 'Password' },
    ]
    :
    [
      { type: 'text', name: 'fullName', label: 'Full name' },
      { type: 'email', name: 'email', label: 'Email' },
      { type: 'text', name: 'age', label: 'Age' },
      { type: 'text', name: 'address', label: 'Address' },
      { type: 'text', name: 'phone', label: 'Phone' },
      { type: 'file', name: 'profilePicture', label: 'Profile picture' },
      { type: 'file', name: 'nidPicture', label: 'NID picture' },
      { type: 'radio', name: 'vehicleType', label: 'Vehicle Type', radioOptions: ['car', 'bike'] },
      { type: 'password', name: 'password', label: 'Password' },
      { type: 'password', name: 'confirmPassword', label: 'Confirm password' },
    ];

  const welcomeShortText = type === 'rider' ?
    `We're excited to have you on board as a rider. Please take a moment to fill out our short form and get started on your next journey. YAY!`
    : `learner! Let's create your account and get started. Fill out the simple form below to begin your learning journey. Let's get started!`;

  return (
    <>
      <section className={`flex justify-center items-center min-h-screen`}>

        <div className={`w-[90%] sm:w-[80%] lg:max-w-[50%] bg-white drop-shadow-lg border my-5 px-10 rounded-3xl`}>

          <div className={`my-5`}>
            <p className={`font-semibold text-lg`}><span className={`text-purple-600 text-3xl`}>Welcome! </span>{welcomeShortText} <span className={`text-xl`}>Click here <Link className={`text-purple-600 text-2xl underline underline-offset-4`} to={`/login`}>Sign in</Link></span></p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid justify-center w-full items-center gap-6 mb-6 grid-cols-1 sm:grid-cols-2`}>

              {
                feildData.map((obj, idx) => {

                  if (obj.type === 'file') {
                    return (
                      <Fragment key={idx}>

                        <div className={`w-full`}>

                          <label className={inputStyle['file-label']} name={obj.name} htmlFor={obj.name}>Upload {obj.label}</label>

                          <input className={inputStyle['file-feild']} {...register(obj.name)} id={obj.name} type="file" required={true} />
                        </div>

                      </Fragment>
                    );

                  } else if (obj.type === 'radio') {

                    return (
                      <Fragment key={idx}>
                        <div className={`w-full`}>

                          <label className={inputStyle['input-label']} name={obj.name} htmlFor={obj.name}>Select {obj.label}</label>

                          <div className={`flex justify-center gap-x-5`}>
                            {
                              obj.radioOptions.map((option, indexRadio) => (
                                <div key={indexRadio} className={inputStyle['radio-container']}>

                                  <input id={obj.name + option} {...register(obj.name)} type="radio" value={option} className={inputStyle['radio-feild']} required={true} />
                                  <label htmlFor={obj.name + option} className={inputStyle['radio-label']}>{option}</label>
                                </div>
                              ))
                            }

                          </div>
                        </div>
                      </Fragment>
                    );

                  } else if (obj.type === 'password') {

                    return (

                      <Fragment key={idx}>
                        <div className={`w-full`}>

                          <label className={inputStyle[`input-label`]}>{obj.label}</label>

                          <div className={`relative`}>

                            <input
                            onFocus={()=>setPassRequireElm(true)}

                              placeholder={`Enter Your ${obj.label}`}

                              type={visibleBool ? 'text' : 'Password'}

                              className={inputStyle[`input-feild`]}
                              {...register(obj.name, { onBlur: () => setPassRequireElm(false) })}
                              minLength='6'
                              required={true} />

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
                      </Fragment>
                    );

                  } else {

                    return (

                      <Fragment key={idx}>
                        <div className={`relative w-full`}>
                          <label className={inputStyle[`input-label`]}>{obj.label}</label>
                          <input placeholder={`Enter Your ${obj.label}`} type={obj.type} className={inputStyle[`input-feild`]} {...register(obj.name,)} />
                        </div>
                      </Fragment>
                    );

                  }

                })
              }

            </div>
            {
              submitBool
               ?
              <LoadingButton middle={true}></LoadingButton>
               :
              <PrimaryButton middle={true}></PrimaryButton>
            }
          </form>

        </div>

      </section>
      <div className={`bg-white ${passRequireElm ? 'top-[20%] md:top-1/2 right-1/2 md:-right-5' : '-top-[50%] md:top-1/2 right-1/2 md:-right-[50%]'} ${inputStyle['password-criteria-box']}`}>
        <h6>Password criteria</h6>
        <ol className={`list-decimal font-medium`}>
          <li className={`text-red-600`}>At least one digit.</li>
          <li className={`text-blue-600`}>At least one lowercase letter.</li>
          <li className={`text-green-600`}>Minimum 6 charecters.</li>
        </ol>
      </div>
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

export default RegForm;
