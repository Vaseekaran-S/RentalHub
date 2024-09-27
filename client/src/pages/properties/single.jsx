import React, { useEffect, useState } from 'react';
import { getPropertyByUrl } from '../../api/property';
import LoadingDiv from '../../components/loading';
import { Link, useParams } from 'react-router-dom';
import PrimaryCard from '../../components/cards';
import PrimaryInput from '../../components/inputs/primary';
import PrimaryBtn from '../../components/buttons/primary';

import axios from '../../api/axios';
import { getScheduleDataForClient } from '../../api/schedule';

function PropertySingle() {
  const { url } = useParams();

  const [property, setProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/schedule', { propertyId: property?._id, userEmail, scheduledDate });
      setIsLoading(true)
      setScheduledDate(response || {})
      console.log('Appointment scheduled:', response.data);
    } catch (error) {
      console.error('Error scheduling appointment:', error);
    }
  };

  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("real-estate-user-email")
        const token = localStorage.getItem('real-estate-user');
        const data = await getPropertyByUrl(url, token);
        const scheduleData = await getScheduleDataForClient(email, data?._id);
        if (isMounted) {
          setProperty(data || {});
          setScheduledDate(scheduleData || {})
          setIsDataFetched(true);
        }
        setIsLoading(false);
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching property data:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false; // cleanup to set the flag to false on unmount
    };
  }, [url]);

  return (
    <div>
      {isLoading && <LoadingDiv />}
      <h2 className="text-lg font-bold py-5">
        <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> /{' '}
        <span className="text-green-800 underline">{property?.name}</span>
      </h2>
      {isDataFetched && (
        <div className="container mx-auto p-10">
          <div className="text-center max-w-[900px] mx-auto">
            <h1 className="text-[30px] text-center font-bold">
              {property?.name} @ {property?.location}
            </h1>
            <h6 className="font-bold text-xl text-gray-500 capitalize">
              {property?.type}
            </h6>
            <div className="flex-center flex-col py-5">
              <img
                src={property?.image}
                alt={property?.name}
                className="w-full max-h-[500px] w-full object-cover rounded"
              />
              <p className="my-4 max-w-[700px]">{property?.description}</p>
              <div className='py-5'>
                <h2 className='text-xl font-bold'>Properties Details</h2>
                <div className='text-start mt-2'>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Name</span>: {property?.name}</p>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Type</span>: {property?.type}</p>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Location</span>: {property?.location}</p>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Price</span>: Rs.{property?.price}</p>
                </div>
              </div>
              <div className='w-full max-w-[700px] py-10'>
                <h2 className='text-xl font-bold mb-5'>Amenities</h2>
                <div className="grid grid-cols-12 gap-5">
                  {property?.amenities.map(amenity => [
                    <div className="col-span-4" key={amenity}>
                      <div className="border px-3 py-2 font-bold text-green-900 rounded hover:bg-gray-100">
                        {amenity}
                      </div>
                    </div>
                  ])}
                </div>
              </div>
            </div>
            <div className="grid grid:grid-logs-6 md:grid-cols-12 gap-5">
              <div className="col-span-6">
                <div className='rounded border shadow'>
                  <iframe title='Map' src={property?.map} className='h-[300px] w-full'></iframe>
                  <h6 className='text-lg font-bold my-3'>Propety Map</h6>
                </div>
              </div>
              <div className="col-span-6 text-start">
                <PrimaryCard customCss="shadow-lg p-9">
                  {scheduledDate?.status ?
                    <div>
                      <h3 className='text-lg font-bold mb-5'>Appointment Status</h3>
                      <p className='mb-2'>Current Status: <span className={`px-2 ml-2 capitalize font-medium py-1 bg-orange-400 rounded ${scheduledDate?.status=='confirmed' && 'bg-green-500'} ${scheduledDate?.status=='cancelled' && 'bg-red-500'}`}>{scheduledDate?.status}</span> </p>
                      <p className='mb-2'>Date: {scheduledDate?.scheduledDate?.split("T")[0]}</p>
                      <p>Time: {scheduledDate?.scheduledDate?.split("T")[1].replace(".000Z", "")}</p>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                      <h3 className='text-lg font-bold mb-5'>Schedule an Appointment</h3>
                      <PrimaryInput onChange={e => setUserEmail(e.target.value)} label="Your Email Id" type="email" customCss="mb-4" placeholder="Enter Email Id" required={true} />
                      <PrimaryInput onChange={e => setScheduledDate(e.target.value)} label="Date and Time" type="datetime-local" required={true} />
                      <PrimaryBtn text="Submit" customCss="mt-5" />
                    </form>
                  }
                </PrimaryCard>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertySingle;
