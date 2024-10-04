import React, { useEffect, useState } from 'react';
import LoadingDiv from '../../components/loading';
import { Link, useParams } from 'react-router-dom';
import PrimaryCard from '../../components/cards';
import PrimaryInput from '../../components/inputs/primary';
import PrimaryBtn from '../../components/buttons/primary';

import { getEquipmentByUrl } from '../../api/equipment';
import axios from '../../api/axios';
import { getScheduleDataForClient } from '../../api/schedule';
import { getUserEmail } from 'utils/getData';

function EquipmentSingle() {
  const { admin, url } = useParams();

  const [equipment, setEquipment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [userMobile, setUserMobile] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const email = getUserEmail();
      const response = await axios.post('/schedule', { equipmentId: equipment?._id, userEmail: email, userMobile, scheduledDate });
      setScheduledDate(response || {})
      setIsLoading(false)
    } catch (error) {
      console.error('Error scheduling rent:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const email = getUserEmail();
        const data = await getEquipmentByUrl(admin, url);

        const scheduleData = await getScheduleDataForClient(email, data?._id);
        if (isMounted) {
          setEquipment(data || {});
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
      isMounted = false;
    };
  }, [admin, url]);

  return (
    <div>
      {isLoading && <LoadingDiv />}
      <h2 className="text-lg font-bold py-5">
        <Link to="/">Home</Link> / <Link to="/equipments">Equipments</Link> /{' '}
        <span className="text-green-800 underline">{equipment?.name}</span>
      </h2>
      {isDataFetched && (
        <div className="container mx-auto p-10">
          <div className="text-center max-w-[900px] mx-auto">
            <h1 className="text-[30px] text-center font-bold">
              {equipment?.name} @ {equipment?.location}
            </h1>
            <h6 className="font-bold text-xl text-gray-500 capitalize">
              {equipment?.type}
            </h6>
            <div className="flex-center flex-col py-5">
              <img
                src={equipment?.image}
                alt={equipment?.name}
                className="w-full max-h-[500px] w-full object-cover rounded"
              />
              <p className="my-4 max-w-[700px]">{equipment?.description}</p>
              <div className='py-5'>
                <h2 className='text-xl font-bold'>Properties Details</h2>
                <div className='text-start mt-2'>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Name</span>: {equipment?.name}</p>
                  <p className='text-lg text-gray-600 capitalize'><span className='font-bold'>Category</span>: {equipment?.category}</p>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Location</span>: {equipment?.location}</p>
                  <p className='text-lg text-gray-600'><span className='font-bold'>Price</span>: Rs.{equipment?.rate}/hour</p>
                </div>
              </div>
              <div className='w-full max-w-[700px] py-10'>
                <h2 className='text-xl font-bold mb-5'>Specifications</h2>
                {equipment?.specifications.length < 1 && <p>No Specifications Added</p>}
                <div className="grid grid-cols-12 gap-5">
                  {equipment?.specifications.map(specification => [
                    <div className="col-span-4" key={specification}>
                      <div className="border px-3 py-2 font-bold text-green-900 rounded hover:bg-gray-100">
                        {specification}
                      </div>
                    </div>
                  ])}
                </div>
              </div>
            </div>
            <div className="grid grid:grid-logs-6 md:grid-cols-12 gap-5">
              <div className="col-span-6">
                <div className='rounded border shadow p-4'>
                  <h6 className='text-lg font-bold mb-3'>Store Map</h6>
                  {equipment?.map ?
                    <iframe title='Map' src={equipment?.map} className='h-[300px] w-full'>
                    </iframe> : "Not Available"}
                </div>
              </div>
              <div className="col-span-6 text-start">
                <PrimaryCard customCss="shadow-lg p-9">
                  {scheduledDate?.status ?
                    <div>
                      <h3 className='text-lg font-bold mb-5'>Appointment Status</h3>
                      <p className='mb-2'>Current Status: <span className={`px-2 ml-2 capitalize font-medium py-1 bg-orange-400 rounded ${scheduledDate?.status === 'confirmed' && 'bg-green-500'} ${scheduledDate?.status === 'cancelled' && 'bg-red-500'}`}>{scheduledDate?.status}</span> </p>
                      <p className='mb-2'>Date: {scheduledDate?.scheduledDate?.split("T")[0]}</p>
                      <p>Time: {scheduledDate?.scheduledDate?.split("T")[1].replace(".000Z", "")}</p>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                      <h3 className='text-lg font-bold mb-5'>Schedule a Rent</h3>
                      <PrimaryInput onChange={e => setUserMobile(e.target.value)} label="Your Mobile Number" type="number" customCss="mb-4" placeholder="Enter Mobile Number" required={true} />
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

export default EquipmentSingle;
