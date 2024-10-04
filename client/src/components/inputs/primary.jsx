import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PrimaryInput({ type, customCss, label, ...props }) {
    const isPassword = type === "password";
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputType =  isPassword ? (isPasswordVisible? 'text' : type ) : type ;

    return (
        <div className='w-full relative'>
            { label &&
                <p className='text-lg font-medium mb-2'>{ label }</p>
             }
            <input type={inputType} className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-700 w-full ${customCss}`} {...props} />
            {
                isPassword &&
                <span className='absolute top-[15px] right-[10px] cursor-pointer'>
                    { isPasswordVisible? <FaEye onClick={()=> setIsPasswordVisible(false)}/> : <FaEyeSlash onClick={()=>setIsPasswordVisible(true)}/> }
                </span>
            }
        </div>
    )
}

export default PrimaryInput
