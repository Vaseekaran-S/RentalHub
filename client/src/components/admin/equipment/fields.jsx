import React from 'react'
import { FormikField, FormikSelect } from '../../formik/field'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import PrimaryButton from '../../buttons/primary'
import PrimaryInput from '../../inputs/primary'

const options = [
    { label: 'Select Category', value: '' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Vehicles', value: 'vehicles' },
    { label: 'Construction', value: 'construction' },
    { label: 'Medical', value: 'medical' },
    { label: 'Sports', value: 'sports' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Tools', value: 'tools' },
    { label: 'Event Equipment', value: 'event-equipment' }
  ]

function EquipmentsFormik({ initialValues, validationSchema, selectImage, formSubmit, isEditPage }) {
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => formSubmit(values)}>
                {({ values }) => (
                    <Form>
                        <FormikField name="name" label="Equipment Name" type="text" placeholder="Enter Equipment Name" />
                        <FormikSelect options={options} name="category" label="Equipment Category" />
                        <FormikField name="rate" label="Rental Rate per Hour" type="text" placeholder="Enter Rate" />
                        <PrimaryInput as="file" name="image" type="file" label="Equipment Image" customCss="border-gray-200 border px-1 py-1 w-full mb-3" onChange={event => selectImage(event)} />
                        { initialValues?.image && <>
                                    <p className='font-medium'>Existing Equipment Image:</p>
                                    <img src={initialValues?.image} alt="Equipment" className='my-2 max-w-[300px] rounded max-h-[200px]' />
                        </> }
                        <FormikField name="location" label="Store Location" type="text" placeholder="Enter Store Location" />
                        <FormikField name="map" label="Store Map" type="text" placeholder="Map Url" />
                        <FormikField name="description" label="Equipment Description" type="text" placeholder="Enter Equipment Description" />
                        <div>
                            <h6 className='text-lg font-medium mb-4'>Specifications</h6>
                            <FieldArray name="specifications">
                                {({ push, remove }) => (
                                    <div className='card'>
                                        {values?.specifications.map((specification, index) => (
                                            <div key={index} className='mb-3'>
                                                <div className='flex gap-4'>
                                                    <Field name={`specifications[${index}]`} placeholder="Enter Specification" className="border focus:outline-none w-full px-3 py-2 rounded" />
                                                    {index >= 0 && (
                                                        <button type="button" className='bg-red-600 text-white text-md font-medium px-3 rounded' onClick={() => remove(index)}>Remove</button>
                                                    )}
                                                </div>
                                                <ErrorMessage name={`specifications[${index}]`} component="div" className='text-sm font-medium text-red-600 pl-1' />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push('')} className='bg-blue-700 text-sm rounded px-3 py-2 text-white font-medium'>Add Specification</button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <PrimaryButton text={isEditPage ? "Update Equipment" : "Add Equipment"} type="submit" customCss="mt-5 lg:max-w-[250px]" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EquipmentsFormik;