
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  equipmentId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userMobile: { type: Number, required: true },
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' }
});

const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);

module.exports = ScheduleModel;
