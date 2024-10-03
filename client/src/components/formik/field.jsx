import { ErrorMessage, Field } from 'formik'
import React from 'react'

function FormikField({ name, label, customCss, ...props }) {
    return (
        <div className='mb-4'>
            <label htmlFor={name} className='text-lg font-medium'>{label}</label><br />
            <Field id={name} name={name} {...props} className={`border mt-2 w-full px-3 py-2 rounded focus:outline-none ${customCss}`} />
            <ErrorMessage name={name} component="div" className='text-sm font-medium text-red-600 pl-1' />
        </div>
    )
}

function FormikSelect({ name, label, customCss, options, ...props }) {
    return (
        <div className='mb-4'>
            <label htmlFor={name} className='text-lg font-medium'>{label}</label><br />
            <Field as="select" id={name} name={name} {...props} className={`border mt-2 w-full px-3 py-2 rounded focus:outline-none ${customCss}`}>
                {
                    options.map(option => [
                        <option key={option?.value} value={option?.value}>{option?.label}</option>
                    ])
                }
            </Field>
            <ErrorMessage name={name} component="div" className='text-sm font-medium text-red-600 pl-1' />
        </div>
    )
}

export { FormikField, FormikSelect }
