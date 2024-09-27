import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from 'yup';

import { createProperty, imageUpload } from '../../../api/property';
import PropertiesFormik from "../../../components/admin/property/fields"
import LoadingDiv from '../../../components/loading';

function AddProperty() {
    const navigator = useNavigate();
    const [imageFile, setIamageFile ] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const initialValues = {
        name: "",
        location: "",
        description: "",
        price: "",
        type: "",
        amenities: []
    }    
    
    const validationSchema = YUP.object({
            ...Object.fromEntries(Object.entries(initialValues).map(element => [element?.[0], YUP.string().required("This Field is required")])),
            amenities: YUP.array().of( YUP.string().required("This Field is required") )
        })

    const selectImage = (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        if(file){
            setIamageFile(file)
        }
    }

    const formSubmit = async(data) => {
        setIsLoading(true)
        const url = data?.name.replaceAll("-", " ").trim().toLowerCase().replaceAll(" ", "-");
        const { image } = await imageUpload(imageFile, url)
        const response = await createProperty({ ...data, url, image  })
        setIsLoading(false)
        if(response?.status === 200){
            alert("Property Created!")
            navigator("/")
        }else{
            alert("Property Not Created! Retry")
        }
    }

    return (
        <div className='py-10 px-5'>
            {isLoading && <LoadingDiv />}
            <h2 className='text-xl font-bold'><Link to="/">Admin</Link> / Add Property</h2>
            <div className='card mt-5 p-20'>
                <PropertiesFormik initialValues={initialValues} isEditPage={false} validationSchema={validationSchema} selectImage={selectImage} formSubmit={formSubmit}/>
            </div>
        </div>
    )
}

export default AddProperty
