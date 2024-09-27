
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  userEmail: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' }
});

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;
