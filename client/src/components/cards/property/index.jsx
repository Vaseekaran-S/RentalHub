import React from 'react'
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";

function PropertyCard({ link, name, location, price, type, image }) {
  return (
    <div className='border p-4 rounded shadow group'>
      <Link to={`/properties/${link}`}>
        <div className='overflow-hidden rounded relative'>
          <span className='absolute bg-green-700 px-2 py-1 rounded font-medium text-white z-50'>₹ {price}</span>
          <img src={image || "/images/equipment.jpg"} alt="Equipment" className='h-[200px] object-cover group-hover:scale-110 transition' />
        </div>
        <h3 className='font-bold mt-2 mb-1 text-xl'>{name}</h3>
        <p className='flex items-center font-medium gap-1'><IoLocationOutline /> { location }</p>
        <p className='flex items-center font-medium gap-1'><BsBuildingsFill /> { type }</p>
      </Link>
    </div>
  )
}

export default PropertyCard
