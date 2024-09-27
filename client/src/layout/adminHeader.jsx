import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "Properties",
    link: "/properties"
  },
  {
    name: "Profile",
    link: "/profile"
  }
]

function AdminHeader() {
  const { pathname } = useLocation();

  return (
    <div className='py-5 flex justify-between items-center border-b'>
      <h2 className='text-xl font-bold text-green-800'>RentalHub</h2>
      <div className='font-medium flex gap-3'>
        { navLinks?.map(({ link, name })=>[
          <Link key={link} to={link} className={`text-gray-600 ${pathname===link && 'text-blue-600 underline'}`}>{name}</Link>
        ]) }
      </div>
    </div>
  )
}

export default AdminHeader
