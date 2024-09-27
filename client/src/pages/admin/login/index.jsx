import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PrimaryInput from '../../../components/inputs/primary'
import PrimaryButton from '../../../components/buttons/primary'

import { adminLogin } from '../../../api/admin'

function AdminLogin({ setIsAdmin }) {
    const [credentials, setCredentials] = useState({});
    const navigator = useNavigate()

    const textEdit = (event) => {
        event.preventDefault();
        setCredentials({
            ...credentials,
            [event?.target?.name]: event?.target?.value
        })
    }

    const formSubmit = async(event) => {
        const button = event.target
        const { username, password } = credentials;
        if(!username || !password) return alert("Enter All Details");
        button.disabled = true;
        const { token } = await adminLogin(username, password);
        if(token){
            setIsAdmin(true)
            localStorage.setItem("admin-token", token)
            navigator("/")
        }
        button.disabled = false;
    }

    return (
        <div className='min-h-[90vh] py-10 flex-center'>
            <div className="rounded p-10 border shadow hover:shadow-lg w-full max-w-[350px] sm:w-[350px] lg:w-[350px] text-center">
                <h5 className='text-xl font-bold'>Admin Login</h5>
                <PrimaryInput type="text" placeholder="Enter Username" customCss="my-5" name="username" onChange={(event) => textEdit(event)} />
                <PrimaryInput type="password" placeholder="Enter Password" customCss="mb-5" name="password" onChange={(event) => textEdit(event)}/>
                <PrimaryButton text="Login" onClick={formSubmit}/>
            </div>
        </div>
    )
}

export default AdminLogin
