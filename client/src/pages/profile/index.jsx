import React, { useEffect, useState } from 'react'
import PrimaryLink from '../../components/links/primary'
import { getUser } from '../../api/users';

function ProfilePage() {
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
      const fetchData = async () => {
        const email = localStorage.getItem("real-estate-user-email")
          const data = await getUser(email);
          console.log(data);
          setProfileData(data || {});
      }
      fetchData()
  }, [])

  return (
    <div className='py-10 min-h-[90vh] my-auto'>
      <div className="grid grid-cols-12 gap-5 my-auto">
        <div className="col-span-12 lg:col-span-4">
            <div className="border rounded p-10 shadow-lg flex-center flex-col bg-gray-200">
                <img src={ profileData?.image? profileData?.image : '/images/admin.jpg'} alt="Profile" className='rounded-lg max-h-[250px] w-auto objectcover border-2' />
                <h2 className='text-[25px] font-bold mt-4'>{ profileData?.name } </h2>
                <p className='text-gray-400 font-medium'>{ profileData?.role }</p>
            </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
            <div className="p-7 border shadow-lg rounded bg-gray-200">
                <h2 className='text-[30px] font-bold mb-3'>Personal Details</h2>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Name : </span> { profileData?.name } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Mobile : </span> { profileData?.mobile } </p>
                <p className='mb-2 font-medium text-lg text-gray-600'><span className='font-bold text-black text-lg'>Email : </span> { profileData?.email } </p>
                {/* <div className='mt-5'>
                    <PrimaryLink link="tel:+919360517438" text="Call Now" customCss="px-3 py-2 text-lg bg-blue-900"/>
                    <PrimaryLink link="mailto:vaseekaransmaintahn@gmail.com" text="Email Now" customCss="px-3 py-2 text-lg ml-3"/>
                </div> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
