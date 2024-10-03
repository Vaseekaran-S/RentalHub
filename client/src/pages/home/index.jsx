import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='min-h-[90vh] text-center flex flex-col items-center justify-center'>
      <h3 className='text-[40px] text-blue-700 font-bold'>
        Welcome to RentalHub World!
      </h3>
      <Link to="/equipments" className='px-3 py-2 rounded mt-10 border bg-green-800 text-white font-medium'>See Equipments</Link>
    </div>
  )
}

export default Home
