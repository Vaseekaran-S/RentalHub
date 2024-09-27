import React from 'react'
import RegistrationForm from '../../components/cards/registration'

function Login() {
  return (
    <div className='h-full min-h-[90vh] flex-center flex-col gap-5 p-10'>
      <RegistrationForm type="login"/>
    </div>
  )
}

export default Login
