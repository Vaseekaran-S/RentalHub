
const router = require('express').Router();
const scheduleController = require('../controller/schedule.controller');

router.get("/", (req, res)=>{
    res.send("Working")
})

// Route to create a new appointment
router.post('/', scheduleController.createAppointment);

// Route to get appointments by property URL
router.get('/:equipmentId', scheduleController.getAppointmentsByEquipmentId);

router.get('/:email/:equipmentId', scheduleController.getAppointmentsByUserEmail);

// Route to update the status of an appointment
router.patch('/:id', scheduleController.updateAppointmentStatus);

module.exports = router;
