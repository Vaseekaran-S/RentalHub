import React, { useEffect, useState } from 'react'
import { getProperties } from '../../../api/property';
import AdminPropertyCard from '../../../components/admin/property/card';
import PrimaryLink from '../../../components/links/primary';

function AdminProperties() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const propertiesData = await getProperties();
            setProperties(propertiesData || []);
        }
        fetchProperties()
    }, [])

    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-[25px] font-bold py-4'>Our Properties</h2>
                <PrimaryLink text="Add +" link="/properties/add" customCss="bg-blue-800" />
            </div>
            <div className='p-5'>
                <div className="grid grid-cols-12 gap-4">
                    {properties.map(property => [
                        <div key={property?.url} className='col-span-12 sm:col-span-6 lg:col-span-4'>
                            <AdminPropertyCard {...property} />
                        </div>
                    ])}
                </div>
                <p className={`w-full font-bold ${properties.length && 'hidden'}`}>No Property Listed</p>
            </div>
        </div>
    )
}

export default AdminProperties
