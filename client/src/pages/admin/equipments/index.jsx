import React, { useEffect, useState } from 'react'
import { getEquipments } from '../../../api/equipment';
import AdminPropertyCard from '../../../components/admin/property/card';
import PrimaryLink from '../../../components/links/primary';

function AdminEquipments() {
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipment = async () => {
            const equipmentsData = await getEquipments();
            setEquipments(equipmentsData || []);
        }
        fetchEquipment()
    }, [])

    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-[25px] font-bold py-4'>Our Properties</h2>
                <PrimaryLink text="Add +" link="/properties/add" customCss="bg-blue-800" />
            </div>
            <div className='p-5'>
                <div className="grid grid-cols-12 gap-4">
                    {equipments.map(equipment => [
                        <div key={equipment?.url} className='col-span-12 sm:col-span-6 lg:col-span-4'>
                            <AdminPropertyCard {...equipment} />
                        </div>
                    ])}
                </div>
                <p className={`w-full font-bold ${equipments.length && 'hidden'}`}>No Property Listed</p>
            </div>
        </div>
    )
}

export default AdminEquipments
