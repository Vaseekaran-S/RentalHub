import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as YUP from 'yup';

import { createEquipment, imageUpload } from '../../../api/equipment';
import EquipmentsFormik from "../../../components/admin/equipment/fields"
import LoadingDiv from '../../../components/loading';

function AddEquipment() {
    const navigator = useNavigate();
    const [imageFile, setIamageFile ] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const initialValues = {
        name: "",
        location: "",
        description: "",
        rate: "",
        category: "",
        specifications: []
    }    
    
    const validationSchema = YUP.object({
            ...Object.fromEntries(Object.entries(initialValues).map(element => [element?.[0], YUP.string().required("This Field is required")])),
            specifications: YUP.array().of( YUP.string().required("This Field is required") )
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

        const { image } = imageFile? await imageUpload(imageFile, url) : "";
        const response = await createEquipment({ ...data, url, image  })
        if(response?.status === 200){
            alert("Equipment Created!")
            navigator("/")
        }else{
            alert("Equipment Not Created! Retry")
        }
        setIsLoading(false)
    }

    return (
        <div className='py-10 px-5'>
            {isLoading && <LoadingDiv />}
            <h2 className='text-xl font-bold'><Link to="/">Admin</Link> / Add Equipment</h2>
            <div className='card mt-5 p-20'>
                <EquipmentsFormik initialValues={initialValues} isEditPage={false} validationSchema={validationSchema} selectImage={selectImage} formSubmit={formSubmit}/>
            </div>
        </div>
    )
}

export default AddEquipment
