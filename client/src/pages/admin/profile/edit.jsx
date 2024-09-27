import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from 'yup';

import { imageUpload } from '../../../api/property';
import { getAdminProfileData, updateAdminData } from '../../../api/admin';

import LoadingDiv from '../../../components/loading';
import { Formik, Form } from 'formik';
import { FormikField } from '../../../components/formik/field';
import PrimaryButton from '../../../components/buttons/primary';

function EditAdminProfile() {
    const navigator = useNavigate();
    const [imageFile, setImageFile] = useState('')
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [profileData, setProfileData] = useState({
        name: "",
        location: "",
        description: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAdminProfileData();
            setProfileData(data);
            setIsDataFetched(true)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const validationSchema = YUP.object({
        ...Object.fromEntries(Object.entries(profileData).map(element => [element?.[0], YUP.string().required("This Field is required")])),
        amenities: YUP.array().of(YUP.string().required("This Field is required"))
    })

    const selectImage = (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        if (file) {
            setImageFile(file)
        }
    }

    const formSubmit = async (data) => {
        setIsLoading(true)
        const adminId = data?.name.replaceAll("-", " ").trim().toLowerCase().replaceAll(" ", "-");
        let imageUrl = data?.image
        if (imageFile) {
            const { image } = await imageUpload(imageFile, adminId)
            imageUrl = image;
        }
        const response = await updateAdminData({ ...data, image: imageUrl })
        setIsLoading(false)
        if (response?.status === 200) {
            alert("Admin Updated!")
            navigator("/profile")
        } else {
            alert("Admin Not Updated! Retry")
        }
    }

    return (
        <div className='py-10 px-5'>
            {isLoading && <LoadingDiv />}
            <h2 className='text-xl font-bold'><Link to="/">Admin</Link> / Edit Profile</h2>
            { isDataFetched &&
                <div className='card mt-5 p-20'>
                    <Formik initialValues={profileData} validationSchema={validationSchema} onSubmit={values => formSubmit(values)}>
                        <Form>
                            <FormikField name="name" label="Name :" type="text" placeholder="Enter Name" />
                            <FormikField name="mobile" label="Mobile Numaber :" type="text" placeholder="Enter Mobile Number" />
                            <FormikField name="email" label="Email Id :" type="text" placeholder="Enter Email Id" />
                            <FormikField name="image" value='' type="file" label="Profile Image :" customCss="border-gray-200 border px-1 py-1 w-full" onChange={event => selectImage(event)} />
                            {profileData?.image && <>
                                <p className='font-medium'>Existing Profile Image:</p>
                                <img src={profileData?.image} alt="Profile" className='max-w-[300px] rounded max-h-[200px] mb-5' />
                            </>}
                            <FormikField name="role" label="Role :" type="text" placeholder="Enter Role" />
                            <FormikField name="location" label="Location :" type="text" placeholder="Enter Location" />
                            <FormikField name="description" label="Description :" type="text" placeholder="Enter Description" />
                            <PrimaryButton text="Update Profile" type="submit" customCss="mt-3 lg:max-w-[250px]" />
                        </Form>
                    </Formik>
                </div>
            }
        </div>
    )
}

export default EditAdminProfile
