import React from 'react'
import { TailSpin } from 'react-loading-icons'

function LoadingDiv() {
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-gray-300 bg-opacity-60 flex-center fixed'>
        <TailSpin stroke='green' width="70px" height="70px" strokeWidth={3} className='mt-10 ml-5'/>
    </div>
  )
}

export default LoadingDiv
