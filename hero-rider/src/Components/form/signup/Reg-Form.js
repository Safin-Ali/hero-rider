import React, { Fragment, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../../Button/Primary-Button';
import inputStyle from '../input.module.css';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import postData from '../../../hooks/postData';
import { imageUpload } from '../../../hooks/imageUpload';
import { UserData } from '../../../context/User.Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegForm() {

  const { register, handleSubmit } = useForm();

  const {userActiveData,load} = useContext(UserData);

  const [visibleBool, setVisibleBool] = useState(false);

  const navigate = useNavigate();

  const {type} = useParams();

  if(load) return;

  if(userActiveData) return <Navigate to={`/`} replace={true}></Navigate>


  const onSubmit = async (data) => {
    try {
      const imageReadyObj = await imageUpload(data);

      const report = await postData(`/signup?role=${type}`,imageReadyObj);

      navigate(`/login`)

    } catch (error) {
      console.log(error.response.data.message)
    }

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
    { type: 'text', name: 'carName', label: 'Car Name', },
    { type: 'text', name: 'carModel', label: 'Car Model', },
    { type: 'text', name: 'carPlate', label: 'Car Number Plate', },
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

  const welcomeShortText = type === ('rider' ?
  `We're excited to have you on board as a rider. Please take a moment to fill out our short form and get started on your next journey.`
  :
  `learner! Let's create your account and get started. Fill out the simple form below to begin your learning journey. Let's get started!`);

  return (
    <>
      <section className={`flex justify-center items-center min-h-screen`}>

        <div className={`max-w-[50%]`}>

          <div className={`my-5`}>
            <p className={`font-semibold`}><span className={`text-purple-600 text-2xl`}>Welcome! </span>{welcomeShortText}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid justify-center items-center gap-6 mb-6 md:grid-cols-2`}>

              {
                feildData.map((obj, idx) => {

                  if (obj.type === 'file') {
                    return (
                      <Fragment key={idx}>

                        <div>

                          <label className={inputStyle['file-label']} name={obj.name} htmlFor={obj.name}>Upload {obj.label}</label>

                          <input className={inputStyle['file-feild']} {...register(obj.name)} id={obj.name} type="file" required={true} />
                        </div>

                      </Fragment>
                    );

                  } else if (obj.type === 'radio') {

                    return (
                      <Fragment key={idx}>
                        <div>

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
                        <div>

                          <label className={inputStyle[`input-label`]}>{obj.label}</label>

                          <div className={`relative`}>

                            <input placeholder={`Enter Your ${obj.label}`} type={visibleBool ? 'text' : 'password'} className={inputStyle[`input-feild`]} {...register(obj.name,)} minLength='6' required={true} />

                            <div onClick={()=>setVisibleBool(!visibleBool)} className={`absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2`}>
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
                        <div className={`relative`}>
                          <label className={inputStyle[`input-label`]}>{obj.label}</label>
                          <input placeholder={`Enter Your ${obj.label}`} type={obj.type} className={inputStyle[`input-feild`]} {...register(obj.name,)} />
                        </div>
                      </Fragment>
                    );

                  }

                })
              }

            </div>
            <PrimaryButton middle={true}></PrimaryButton>
          </form>

        </div>

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

export default RegForm;