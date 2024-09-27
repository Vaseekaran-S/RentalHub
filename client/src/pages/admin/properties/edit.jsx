import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as YUP from 'yup';

import { updateProperty, getProperty, imageUpload } from '../../../api/property';

import LoadingDiv from '../../../components/loading';
import PropertiesFormik from '../../../components/admin/property/fields';

function EditProperty() {
    const { url } = useParams();

    const navigator = useNavigate();
    const [imageFile, setImageFile] = useState('')
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const [property, setProperty] = useState({
        name: "",
        location: "",
        description: "",
        price: "",
        type: "",
        amenities: []
    });

    useEffect(() => {
        const fetchProperty = async () => {
            const propertiesData = await getProperty(url);
            setProperty(propertiesData);
            setIsDataFetched(true)
            setIsLoading(false)
        }
        fetchProperty()
    }, [url])

    const validationSchema = YUP.object({
        ...Object.fromEntries(Object.entries(property).map(element => [element?.[0], YUP.string().required("This Field is required")])),
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
        const url = data?.name.replaceAll("-", " ").trim().toLowerCase().replaceAll(" ", "-");
        let imageUrl = data?.image
        if (imageFile) {
            const { image } = await imageUpload(imageFile, url)
            imageUrl = image;
        }
        const response = await updateProperty({ ...data, url, image: imageUrl })
        setIsLoading(false)
        if (response?.status === 200) {
            alert("Property Updated!")
            navigator("/")
        } else {
            alert("Property Not Updated! Retry")
        }
    }

    return (
        <div className='py-10 px-5'>
            {isLoading && <LoadingDiv />}
            <h2 className='text-xl font-bold'><Link to="/">Admin</Link> / Edit Property</h2>
            {isDataFetched &&
                <div className='card mt-5 p-20'>
                    <PropertiesFormik initialValues={property} isEditPage={true} validationSchema={validationSchema} selectImage={selectImage} formSubmit={formSubmit} />
                </div>
            }
        </div>
    )
}

export default EditProperty
