import React, { useEffect, useState } from 'react'
import { getProperties } from '../../api/property'
import PropertyCard from '../../components/cards/property';

import PrimaryInputSelect from '../../components/filters/select'
import PrimaryCard from '../../components/cards';
import PriceRangeFilter from '../../components/filters/price';

const propertiesTypes = [
  {
    label: "Farmlands",
    value: "farmlands"
  },
  {
    label: "Plots",
    value: "plots"
  },
  {
    label: "Villas",
    value: "villas"
  },
  {
    label: "Flats",
    value: "flats"
  }
]

const propertiesLocations = [
  {
    label: "Chennai",
    value: "Chennai"
  },
  {
    label: "Trichy",
    value: "Trichy"
  },
  {
    label: "Coimbatore",
    value: "Coimbatore"
  },
  {
    label: "Madurai",
    value: "Madurai"
  },
  {
    label: "Thanjavur",
    value: "Thanjavur"
  }
]

const filterProperties = (properties, filters) => {
  console.log(properties);
  return properties.filter(property => {
    let matches = true;

    const propertyName = property?.name?.toLowerCase()
    const filterName = filters?.name?.toLowerCase()

    if (filters.name && propertyName.indexOf(filterName) === -1) return false;
    if (filters.type && filters.type !== property.type) return false;
    if (filters.location && property.location !== filters.location) matches = false;
    if (filters.minPrice && property.price < filters.minPrice) matches = false;
    if (filters.maxPrice && property.price > filters.maxPrice) matches = false;

    return matches
  })
}

function Properties() {
  const [properties, setProperties] = useState([]);
  const [isFilterCleared, setIsFilterCleared] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesData = await getProperties();
      setProperties(propertiesData || []);
    }
    fetchProperties()
  }, [])

  const [filters, setFilters] = useState({
    type: "",
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

  const filteredProperties = filterProperties(properties, filters)

  const searchProperties = (event) => {
    event.preventDefault()
    setFilters({ ...filters, name: event.target.value });
  }

  function clearFilter() {
    setFilters({
      type: "",
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
        <h2 className='text-[25px] font-bold w-full py-4'>Our Properties</h2>
        <div className='w-full'>
          <input type="text" placeholder='Search' className='border border-[2px] font-medium rounded target:border-[3px] w-full px-2 py-2' onChange={searchProperties} />
        </div>
      </div>
      <div className='grid grid-cols-12 gap-5 py-5'>
        <div className='col-span-12 md:col-span-3'>
          <div className=' h-auto'>
            <h3 className='text-lg font-bold'>Filter Properties:</h3>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PrimaryInputSelect label="By Type" name="type" options={propertiesTypes} value={filters?.type} onChange={handleFilterChange} />
            </PrimaryCard>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PrimaryInputSelect label="By Location" name="location" value={filters?.location} options={propertiesLocations} onChange={handleFilterChange} />
            </PrimaryCard>
            <PrimaryCard customCss="mt-4 bg-gray-200">
              <PriceRangeFilter minPrice={200000} maxPrice={15000000} onFilterChange={handlePriceFilterChange} isFilterCleared={isFilterCleared}/>
            </PrimaryCard>
          </div>
        </div>
        <div className='col-span-12 md:col-span-9 border p-5 rounded'>
          <div className="grid grid-cols-12 gap-4">
            {filteredProperties.map(property => [
              <div key={property?.url} className='col-span-12 sm:col-span-6 lg:col-span-4'>
                <PropertyCard {...property} link={property?.url} />
              </div>
            ])}
          </div>
          <div className={`${filteredProperties.length && 'hidden'}`}>
            <p className={`w-full font-bold `}>No Property Found</p>
            <button onClick={clearFilter} className='font-medium rounded px-2 py-1 bg-green-700 text-white mt-4'>Clear Filter</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Properties
