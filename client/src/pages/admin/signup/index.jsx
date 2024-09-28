import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import PrimaryBtn from 'components/buttons/primary'
import Loader from 'components/loading';

import adminFieldsData from 'data/inputs/adminSignup'


export default function AdminSignUp({ type }) {

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required *'),
        mobile: Yup.string().required('Mobile is required *'),
        email: Yup.string().email('Invalid email address').required('Email is required *'),
        password: Yup.string().required('Password is required *'),
    });

    const initialValues = {
        name: "",
        email: "",
        password: "",
        mobile: ""
    }

    const [isLoaderOn, setIsLoaderOn] = useState(false);

    const onSubmitForm = async (values) => {
        setIsLoaderOn(true)
        try {
            // const responce = await action(values)
            // if (responce?.status === 202) {
            //     localStorage.setItem("real-estate-user", responce?.token)
            //     localStorage.setItem("real-estate-user-email", responce?.email)
            //     window.location.href = "/"
            // }
            // alert(responce?.msg)
        } catch (err) {
            console.log(err);
            alert(err?.message)
        }
        setIsLoaderOn(false)
    }

    return (
        <>
            {isLoaderOn && <Loader />}
            <div className='min-h-[100vh] flex-center flex-col gap-5'>
                <div className="rounded shadow border p-8 bg-white max-w-sm sm:min-w-[350px] hover:shadow-lg">
                    <h2 className='font-bold text-xl mb-5 text-center'>
                        Register as Admin
                    </h2>
                    <hr />
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitForm}>
                        <Form>
                            <div className="flex-center flex-col m-auto mt-6 gap-4 w-[250px]">
                                {adminFieldsData?.map((field, index) => {
                                    return (
                                        <div key={index} className='w-full'>
                                            <Field {...field} className="w-full border rounded px-3 py-2 " />
                                            <ErrorMessage {...field} component="div" className='text-red-900 font-medium text-xs mt-1 ml-1' />
                                        </div>
                                    )
                                })}
                                <PrimaryBtn text="Register" type="submit" />
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="rounded shadow border p-5 sm:min-w-[350px] hover:shadow-lg">
                    <h2 className='font-medium text-lg text-center'>
                        Already Registered? <Link className='text-blue-700 hover:text-blue-800 ml-1' to="/admin">Login Here</Link>
                    </h2>
                </div>
            </div>
        </>
    )
}