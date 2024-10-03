import React, { useEffect, useState } from 'react'
import PrimaryLink from '../../../components/links/primary'
import { getAdminProfileData } from '../../../api/admin';
import { deleteAdmin } from 'utils/getData';
import PrimaryButton from 'components/buttons/primary';

function AdminProfile() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
      const fetchData = async () => {
          const data = await getAdminProfileData();
          console.log(data);
          setProfileData(data || {});
      }
      fetchData()
  }, [])


  const logOut = () => {
    deleteAdmin();
    window.location.href = "/"
  }

  return (
    <div className='py-10'>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
            <div className="border rounded p-10 shadow-lg flex-center flex-col bg-gray-200">
                <img src={ profileData?.image? profileData?.image : '/images/admin.jpg'} alt="Profile" className='rounded-lg max-h-[250px] w-auto objectcover border-2' />
                <h2 className='text-[25px] font-bold mt-4'>{ profileData?.name } </h2>
                <p className='text-gray-400 font-medium'>{ profileData?.role }</p>
                <PrimaryButton text="LogOut" customCss="bg-red-700 mt-3 hover:bg-red-800" onClick={()=>logOut()} />
            </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
            <div className="p-7 border shadow-lg rounded bg-gray-200">
                <h2 className='text-[30px] font-bold mb-3'>Personal Details</h2>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Name : </span> { profileData?.name } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Mobile : </span> { profileData?.mobile } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Email : </span> { profileData?.email } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Location : </span> { profileData?.location } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Role : </span> { profileData?.role } </p>
                <p className='mb-5 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Description : </span> { profileData?.description } </p>
                <PrimaryLink link="/profile/edit" text="Edit Profile" customCss='text-md font-medium px-3 py-2 bg-blue-900' />
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
