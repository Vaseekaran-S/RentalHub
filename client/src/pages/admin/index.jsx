import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getProperties } from '../../api/property'

function Admin() {

  const [length, setLength] = useState(0);

  useEffect(()=>{
    const fetchData = async() =>{
      const properties = await getProperties()
      setLength(properties?.length)
    }
    fetchData()
  }, [])

  return (
    <div className='py-10 px-5'>
      <h2 className='text-xl font-bold mb-5'>Admin Dashboard</h2>
      <div className='grid grid-cols-12 gap-5'>
        <div className='col-span-12 sm:col-span-6 lg:col-span-3'>
          <Link to="/properties">
            <div className="card bg-blue-800 text-white group">
              <img src="/images/property.jpeg" alt="Property" className='h-full w-full rounded mb-2' />
              <h6 className='text-lg font-bold'>Properties:</h6>
              <p>Total: {length}</p>
            </div>
          </Link>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3">
          <Link to="/properties/add">
            <div className="card flex-center h-[200px] bg-gray-700 text-white group">
              <p className='text-[20px] font-medium flex items-center gap-2'>
                Add Property <FaPlus className='group-hover:scale-150 transition' />
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin
