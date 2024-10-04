import React, { useEffect, useState } from 'react'
import { getEquipments } from '../../api/equipment'
import EquipmentCard from '../../components/cards/property';

import PrimaryInputSelect from '../../components/filters/select'
import PrimaryCard from '../../components/cards';
import PriceRangeFilter from '../../components/filters/price';

const equipmentsTypes = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Vehicles', value: 'vehicles' },
  { label: 'Construction', value: 'construction' },
  { label: 'Medical', value: 'medical' },
  { label: 'Sports', value: 'sports' },
  { label: 'Home Appliances', value: 'home-appliances' },
  { label: 'Tools', value: 'tools' },
  { label: 'Event Equipment', value: 'event-equipment' }
]

const locations = [
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Trichy', value: 'Trichy' },
  { label: 'Coimbatore', value: 'Coimbatore' },
  { label: 'Madurai', value: 'Madurai' },
  { label: 'Thanjavur', value: 'Thanjavur' },
  { label: 'Salem', value: 'Salem' },
  { label: 'Erode', value: 'Erode' }
]

const filterEquipments = (equipments, filters) => {
  return equipments.filter(equipment => {
    let matches = true;

    const equipmentName = equipment?.name?.toLowerCase()
    const filterName = filters?.name?.toLowerCase()

    if (filters.name && equipmentName.indexOf(filterName) === -1) return false;
    if (filters.category && filters.category !== equipment.category) return false;
    if (filters.location && equipment.location !== filters.location) matches = false;
    if (filters.minPrice && equipment.rate < filters.minPrice) matches = false;
    if (filters.maxPrice && equipment.rate > filters.maxPrice) matches = false;

    return matches
  })
}

function Equipments() {
  const [equipments, setEquipments] = useState([]);
  const [isFilterCleared, setIsFilterCleared] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      const equipmentsData = await getEquipments();
      setEquipments(equipmentsData || []);
    }
    fetchEquipment()
  }, [])

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    name: ""
  });

  const handlePriceFilterChange = (min, max) => {
    setFilters({ ...filters, maxPrice: max, minPrice: min });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredEquipments = filterEquipments(equipments, filters)

  const searchEquipments = (event) => {
    event.preventDefault()
    setFilters({ ...filters, name: event.target.value });
  }

  function clearFilter() {
    setFilters({
      category: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      name: ""
    })
    setIsFilterCleared(false)
  }

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center'>
        <h2 className='text-[25px] font-bold w-full py-4'>Equipments</h2>
        <div className='w-full'>
          <input type="text" placeholder='Search' className='border border-[2px] font-medium rounded target:border-[3px] w-full px-2 py-2' onChange={searchEquipments} />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-5 py-5'>
        <div className='col-span-12 md:col-span-3'>
          <div className=' h-auto'>
            <h3 className='text-lg font-bold'>Filter Equipments:</h3>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PrimaryInputSelect label="By Type" name="category" options={equipmentsTypes} value={filters?.category} onChange={handleFilterChange} />
            </PrimaryCard>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PrimaryInputSelect label="By Location" name="location" value={filters?.location} options={locations} onChange={handleFilterChange} />
            </PrimaryCard>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PriceRangeFilter minPrice={1} maxPrice={1000} onFilterChange={handlePriceFilterChange} isFilterCleared={isFilterCleared} />
            </PrimaryCard>
          </div>
        </div>
        <div className='col-span-12 md:col-span-9 border p-5 rounded'>
          <div className="grid grid-cols-12 gap-4">
            {filteredEquipments.map(equipment => [
              <div key={equipment?.url} className='col-span-12 sm:col-span-6 lg:col-span-4'>
                <EquipmentCard {...equipment} link={equipment?.url} />
              </div>
            ])}
          </div>
          <div className={`${filteredEquipments.length && 'hidden'}`}>
            <p className={`w-full font-bold `}>No Equipment Found</p>
            <button onClick={clearFilter} className='font-medium rounded px-2 py-1 bg-green-700 text-white mt-4'>Clear Filter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipments
