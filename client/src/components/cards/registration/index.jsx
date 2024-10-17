import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import PrimaryBtn from '../../buttons/primary'
import Loader from '../../loading';

import loginFieldsData from '../../../data/inputs/login'
import signUpFieldsData from '../../../data/inputs/signup'

import { logIn, signUp } from '../../../api/users';

export default function RegistrationForm({ type }) {
    const navigate = useNavigate();

    const login = type === 'login';

    const signupValidationSchema = Yup.object({
        name: Yup.string().required('Name is required *'),
        mobile: Yup.string().required('Mobile is required *'),
        email: Yup.string().email('Invalid email address').required('Email is required *'),
        password: Yup.string().required('Password is required *'),
    });

    const loginValidationSchema = Yup.object({
        email: Yup.string().required('Email is required *'),
        password: Yup.string().required('Password is required *'),
    });

    const initialValues = login ? {
        email: "",
        password: ""

    } : {
        name: "",
        email: "",
        password: "",
        mobile: ""
    }

    const renderingData = {
        title: (login) ? 'Welcome Back!' : 'Signup ToDay!',
        submitBtnPlaceholder: (login) ? 'Login' : 'Sign up',
        fields: (login) ? loginFieldsData : signUpFieldsData,
        boxTitle: (login) ? 'Not yet Registered?' : 'Already have an account?',
        bottomBtn: (login) ? 'Sign up' : 'Login',
        bottomAction: (login) ? '/signup' : '/login',
        validationSchema: (login) ? loginValidationSchema : signupValidationSchema,
        action: (login) ? logIn : signUp
    }

    const { title, submitBtnPlaceholder, fields, boxTitle, bottomBtn, bottomAction, validationSchema, action } = renderingData

    const [isLoaderOn, setIsLoaderOn] = useState(false);

    const onSubmitForm = async (values) => {
        setIsLoaderOn(true)
        try {
            const responce = await action(values)
            if (responce?.status === 202) {
                localStorage.setItem("rentalhub-user", responce?.token)
                localStorage.setItem("rentalhub-user-email", responce?.email)
                window.location.href = "/"
                alert(responce?.msg)
            }else{
                alert("Network Error!")
            }
        } catch (err) {
            console.log(err);
            alert(err?.message)
        }
        setIsLoaderOn(false)
    }

    return (
        <>
            {isLoaderOn && <Loader />}
            <div className='h-full flex-center flex-col gap-5'>
                <div className="rounded shadow border p-8 bg-white max-w-sm sm:min-w-[350px] hover:shadow-lg">
                    <h2 className='font-bold text-xl mb-5 text-center'>
                        {title}
                    </h2>
                    <hr />
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm}>
                        <Form>
                            <div className="flex-center flex-col m-auto mt-6 gap-4 w-[250px]">
                                {fields?.map((field, index) => {
                                    return (
                                        <div key={index} className='w-full'>
                                            <Field {...field} className="w-full border rounded px-3 py-2 " />
                                            <ErrorMessage {...field} component="div" className='text-red-900 font-medium text-xs mt-1 ml-1' />
                                        </div>
                                    )
                                })}
                                <PrimaryBtn text={submitBtnPlaceholder} type="submit" />
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="rounded shadow border p-5 sm:min-w-[350px] hover:shadow-lg">
                    <h2 className='font-medium text-lg text-center'>
                        {boxTitle} <Link className='text-blue-700 hover:text-blue-800 ml-1' to={bottomAction}>{bottomBtn}</Link>
                    </h2>
                </div>
                <div className="rounded shadow border p-5 sm:min-w-[350px] hover:shadow-lg">
                    <h2 className='font-medium text-lg text-center'>
                        {login ? 'Login' : 'Register'} as Admin: <Link className='text-blue-700 hover:text-blue-800 ml-1' to={`/admin-${login? 'login' : 'signup'}`}>{login? 'Login' : 'Register'}</Link>
                    </h2>
                </div>
            </div>
        </>
    )
}