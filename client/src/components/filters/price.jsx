import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './price.css'; // Custom styles for the slider

const PriceRangeFilter = ({ minPrice, maxPrice, onFilterChange }) => {
  const [values, setValues] = useState([minPrice, maxPrice]);

  const handleChange = (newValues) => {
    setValues(newValues);
    onFilterChange(newValues[0], newValues[1]);
  };

  return (
    <div className='p-2'>
      <h6 className="block text-lg font-bold text-gray-600 mb-3">
        Price Range :
      </h6>
      <p className='font-bold text-md'>₹{values[0]} - ₹{values[1]}</p>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        min={minPrice}
        max={maxPrice}
        value={values}
        onChange={handleChange}
        ariaLabel={['Lower thumb', 'Upper thumb']}
      />
    </div>
  );
};

export default PriceRangeFilter;
