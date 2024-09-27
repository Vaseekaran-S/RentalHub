import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryLink from '../../links/primary'
import { useNavigate } from 'react-router-dom'

import { deleteProperty } from '../../../api/property'

function AdminPropertyCard({ name, price, image, url, _id }) {
  const navigate = useNavigate();

  const deleteProp = async () => {
    if (window.confirm(`Really want to delete ${name}!`)) {
      const response = await deleteProperty(_id)
      alert(response?.msg)
      navigate(0)
    }
  }

  return (
    <div className='border p-4 rounded shadow group'>
      <div className='rounded relative overflow-hidden'>
        <span className='absolute bg-green-700 px-2 py-1 rounded font-medium text-white z-50'>₹ {price}</span>
        <img src={image || "/images/property.jpeg"} alt="Property" className='h-[200px] w-full object-cover group-hover:scale-110 transition' />
      </div>
      <div className='flex justify-between items-center'>
        <h3 className='font-bold mt-2 mb-1 text-xl'>
          <Link to={url}>{name}</Link>
        </h3>
        <Link to={`/properties/${_id}/analysis`} className='underline'>View Actions</Link>
      </div>
      <div className='flex justify-between mt-4'>
        <PrimaryLink text="Edit" link={`/properties/edit/${_id}`} customCss="bg-blue-800" />
        <button className='px-2 py-1 rounded bg-red-800 text-white font-medium' onClick={deleteProp}>Delete</button>
      </div>
    </div>
  )
}

export default AdminPropertyCard
