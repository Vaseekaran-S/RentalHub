import React from 'react'

function PrimaryInputSelect({ customCss, label, options = [], ...props }) {

    return (
        <div className='w-full relative'>
            {label &&
                <p className='text-md font-bold text-gray-600 mb-2'>{label}</p>
            }
            <select className={`border px-3 py-2 rounded w-full ${customCss}`} {...props}>
                <option value="">All</option>
                {options.map(option => [
                    <option key={option?.value} value={option?.value}>{option?.label}</option>
                ])}
            </select>
        </div>
    )
}

export default PrimaryInputSelect
