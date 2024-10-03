import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as YUP from 'yup';

import { updateEquipment, getEquipment, imageUpload } from '../../../api/equipment';

import LoadingDiv from '../../../components/loading';
import PropertiesFormik from '../../../components/admin/equipment/fields';

function EditEquipment() {
    const { url } = useParams();

    const navigator = useNavigate();
    const [imageFile, setImageFile] = useState('')
    const [isDataFetched, setIsDataFetched] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const [equipment, setEquipment] = useState({
        name: "",
        location: "",
        description: "",
        rate: "",
        category: "",
        specifications: []
    });

    useEffect(() => {
        const fetchEquipment = async () => {
            const equipmentData = await getEquipment(url);
            setEquipment(equipmentData);
            setIsDataFetched(true)
            setIsLoading(false)
        }
        fetchEquipment()
    }, [url])

    const validationSchema = YUP.object({
        ...Object.fromEntries(Object.entries(equipment).map(element => [element?.[0], YUP.string().required("This Field is required")])),
        specifications: YUP.array().of(YUP.string().required("This Field is required"))
    })

    const selectImage = (event) => {
        event.preventDefault()
        const file = event.target.files[0];
        if (file) {
            setImageFile(file)
        }
    }

    const formSubmit = async (data) => {
        console.log(data);
        
        setIsLoading(true)
        const url = data?.name.replaceAll("-", " ").trim().toLowerCase().replaceAll(" ", "-");
        let imageUrl = data?.image
        if (imageFile) {
            const { image } = await imageUpload(imageFile, url)
            imageUrl = image;
        }
        const response = await updateEquipment({ ...data, url, image: imageUrl })
        setIsLoading(false)
        if (response?.status === 200) {
            alert("Equipment Updated!")
            navigator("/")
        } else {
            alert("Equipment Not Updated! Retry")
        }
    }

    return (
        <div className='py-10 px-5'>
            {isLoading && <LoadingDiv />}
            <h2 className='text-xl font-bold'><Link to="/">Admin</Link> / Edit Equipment</h2>
            {isDataFetched &&
                <div className='card mt-5 p-20'>
                    <PropertiesFormik initialValues={equipment} isEditPage={true} validationSchema={validationSchema} selectImage={selectImage} formSubmit={formSubmit} />
                </div>
            }
        </div>
    )
}

export default EditEquipment
