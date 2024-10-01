import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/users';
import PrimaryButton from 'components/buttons/primary';

function ProfilePage() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem("rentalhub-user-email")
      const data = await getUser(email);
      console.log(data);
      setProfileData(data || {});
    }
    fetchData()
  }, [])

  const logOut = () => {
    localStorage.removeItem("rentalhub-user")
    window.location.href = "/"
  }

  return (
    <div className='py-10 min-h-[90vh] my-auto'>
      <div className="grid grid-cols-12 gap-5 my-auto">
        <div className="col-span-12 lg:col-span-4">
          <div className="border rounded p-10 shadow-lg flex-center flex-col bg-gray-200">
            <img src={profileData?.image ? profileData?.image : '/images/admin.jpg'} alt="Profile" className='rounded-lg max-h-[250px] w-auto objectcover border-2' />
            <h2 className='text-[25px] font-bold mt-4'>{profileData?.name} </h2>
            <p className='text-gray-400 font-medium'>{profileData?.role}</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="p-7 border shadow-lg rounded bg-gray-200">
            <h2 className='text-[30px] font-bold mb-3'>Personal Details</h2>
            <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Name : </span> {profileData?.name} </p>
            <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Mobile : </span> {profileData?.mobile} </p>
            <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Email : </span> {profileData?.email} </p>
            <PrimaryButton onClick={() => logOut()} customCss="bg-red-700 hover:bg-red-800 max-w-[300px] mt-4">LogOut</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
