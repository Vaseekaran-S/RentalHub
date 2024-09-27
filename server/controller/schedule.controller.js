
const ScheduleModel = require('../models/schedule.model');

// Create a new appointment
const createAppointment = async (req, res) => {
  const { propertyId, userEmail, scheduledDate } = req.body;

  try {
    const newSchedule = new ScheduleModel({ propertyId, userEmail, scheduledDate });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling appointment', error });
  }
};

// Get appointments by property URL
const getAppointmentsByPropertyId = async (req, res) => {
  try {
    const appointments = await ScheduleModel.find({ propertyId: req.params?.propertyId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Get appointments by property URL
const getAppointmentsByUserEmail = async (req, res) => {
  try {
    console.log(req.params);
    const appointments = await ScheduleModel.findOne({ propertyId: req.params?.propertyId, userEmail: req.params?.email });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Update the status of an appointment
const updateAppointmentStatus = async (req, res) => {
  const { status, scheduledDate } = req.body;

  try {
    const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
      req.params.id,
      { status: status, scheduledDate: scheduledDate },
      { new: true }
    );
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error });
  }
};

module.exports = {
  createAppointment,
  getAppointmentsByPropertyId,
  updateAppointmentStatus,
  getAppointmentsByUserEmail
};
