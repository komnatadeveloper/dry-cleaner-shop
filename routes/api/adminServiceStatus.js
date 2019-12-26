const express = require("express");
const router = express.Router();
const ServiceStatus = require('../../models/ServiceStatus')
const authAdmin = require("../../middleware/authAdmin");


// Add A Service Status
router.post('/', authAdmin, async (req, res) => {
  try {

    console.log(req.body);

    const {
      servStatus,
      description
    } = req.body;

    // Check if this Service Status already exists
    const status1 = await ServiceStatus.findOne({servStatus});
    console.log(status1);
    if (status1) {
      return res.status(400).send();
    }

    const status2 = new ServiceStatus({
      servStatus,
      description
    });

    await status2.save();

    res.status(200).send(status2);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// GET All Service Statuses
router.get('/',  async (req, res) => {
  try {

    const statusList = await ServiceStatus.find();

    res.status(200).json(statusList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Update a Service Status
router.put('/:id', authAdmin, async (req, res) => {
  
  try {

    const { servStatus, description } = req.body;

    const status = await ServiceStatus.findById(req.params.id);
    if(! status) {
      return res.status(400).json('Service Status does not exist')
    }

    status.servStatus = servStatus;
    if( description ) status.description = description;
    

    await status.save();

    res.status(200).json(status);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})



// Delete a Service Status
router.delete('/:id', authAdmin, async (req, res) => {
  
  try {

    const status = await ServiceStatus.findById(req.params.id);
    if(! status) {
      return res.status(400).json('Service Status does not exist')
    }
    await status.remove();

    res.status(200).json(status);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})



module.exports = router;