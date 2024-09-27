import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProperty } from '../../../api/property';
import LoadingDiv from '../../../components/loading';
import Card from '../../../components/cards/index';
import PrimaryTable from '../../../components/table/primary';
import axios from '../../../api/axios';
import Modal from '../../../components/modals/primary';

function PropertyAnalysis() {
  const { url } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [property, setProperty] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    type: "",
    amenities: []
  });
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await getProperty(url);
      console.log(propertyData);
      setProperty(propertyData);
      setIsLoading(false);
    };
    fetchProperty();
  }, [url]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`/schedule/${url}`);
        console.log(response);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [url]);

  const openModal = (appointment) => {
    console.log(appointment);
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    // Handle appointment update logic here
    try {
      await axios.patch(`/schedule/${selectedAppointment?._id}`, selectedAppointment);
      // Refresh appointments
      const response = await axios.get(`/schedule/${url}`);
      setAppointments(response.data);
      closeModal();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const printTable = () => {
    const printContent = document.getElementById('printable-table').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `<div>${printContent}</div>`;
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div>
      {isLoading && <LoadingDiv />}
      {!isLoading && (
        <div className="p-10">
          <div className="text-center">
            <h1 className="text-[30px] text-center font-bold">
              {property?.name} @ {property?.location}
            </h1>
            <h6 className="font-bold text-xl text-gray-500 capitalize mb-8">
              {property?.type}
            </h6>
            <div className="grid grid-cols-12 gap-10 max-w-[900px] mx-auto">
              <div className="col-span-6">
                <div className="flex-center flex-col">
                  <img
                    src={property?.image}
                    alt={property?.name}
                    className="max-w-[900px] max-h-[500px] w-full object-cover rounded"
                  />
                </div>
              </div>
              <div className="col-span-6">
                <Card customCss="flex-center flex-col shadow-lg py-10">
                  <h2 className='text-xl font-bold'>Properties Details</h2>
                  <div className='text-start mt-4'>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Name</span>: {property?.name}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Type</span>: {property?.type}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Location</span>: {property?.location}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Price</span>: Rs.{property?.price}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Impressions</span>: {property?.impressions}</p>
                    <p className='text-lg text-gray-600'><span className='font-bold'>Schedules</span>: {appointments?.length || 0}</p>
                  </div>
                </Card>
              </div>
            </div>
            <div className='mx-auto py-10'>
              <div id="printable-table" className="printable-table">
                <PrimaryTable data={appointments} onEdit={openModal} />
              </div>
            </div>
          </div>
          <div className='text-center'>
            <button className='bg-gray-500 font-medium hover:bg-gray-600 px-3 py-2 text-white rounded' onClick={printTable}>Download PDF</button>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
        {selectedAppointment && (
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="datetime-local"
                name="scheduledDate"
                className="w-full border rounded px-3 py-2"
                value={selectedAppointment.scheduledDate?.replace(".000Z","")}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select name="status" id="status" value={selectedAppointment.status} onChange={handleChange} className='w-full border p-2 rounded focus:outline-none'>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default PropertyAnalysis;
