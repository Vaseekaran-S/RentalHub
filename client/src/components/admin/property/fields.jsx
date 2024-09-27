import React from 'react'
import { FormikField, FormikSelect } from '../../formik/field'
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import PrimaryButton from '../../buttons/primary'
import PrimaryInput from '../../inputs/primary'

const options = [
    { label: 'Select Property Type', value: '' },
    { label: 'Plots', value: 'plots' },
    { label: 'Villas', value: 'villas' },
    { label: 'Flats', value: 'flats' },
    { label: 'Farmlands', value: 'farmlands' }
  ]

function PropertiesFormik({ initialValues, validationSchema, selectImage, formSubmit, isEditPage }) {
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => formSubmit(values)}>
                {({ values }) => (
                    <Form>
                        <FormikField name="name" label="Property Name" type="text" placeholder="Enter Property Name" />
                        <FormikSelect options={options} name="type" label="Property Type" />
                        <FormikField name="price" label="Property Price" type="text" placeholder="Enter Property Price" />
                        <PrimaryInput as="file" name="image" type="file" label="Property Image" customCss="border-gray-200 border px-1 py-1 w-full mb-3" onChange={event => selectImage(event)} />
                        { initialValues?.image && <>
                                    <p className='font-medium'>Existing Property Image:</p>
                                    <img src={initialValues?.image} alt="Property" className='my-2 max-w-[300px] rounded max-h-[200px]' />
                        </> }
                        <FormikField name="location" label="Property Location" type="text" placeholder="Enter Property Location" />
                        <FormikField name="map" label="Property Map" type="text" placeholder="Map Url" />
                        <FormikField name="description" label="Property Description" type="text" placeholder="Enter Property Description" />
                        <div>
                            <h6 className='text-lg font-medium mb-4'>Amenities</h6>
                            <FieldArray name="amenities">
                                {({ push, remove }) => (
                                    <div className='card'>
                                        {values.amenities.map((amenity, index) => (
                                            <div key={index} className='mb-3'>
                                                <div className='flex gap-4'>
                                                    <Field name={`amenities[${index}]`} placeholder="Enter Amenity" className="border focus:outline-none w-full px-3 py-2 rounded" />
                                                    {index >= 0 && (
                                                        <button type="button" className='bg-red-600 text-white text-md font-medium px-3 rounded' onClick={() => remove(index)}>Remove</button>
                                                    )}
                                                </div>
                                                <ErrorMessage name={`amenities[${index}]`} component="div" className='text-sm font-medium text-red-600 pl-1' />
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push('')} className='bg-blue-700 text-sm rounded px-3 py-2 text-white font-medium'>Add Amenity</button>
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <PrimaryButton text={isEditPage ? "Update Property" : "Add Property"} type="submit" customCss="mt-5 lg:max-w-[250px]" />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default PropertiesFormik;