const express = require("express");
const router = express.Router();
const Service = require("../../models/Service");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

// Add A Service Connected with a Product
router.post('/',  async (req, res) => {

  try {

    console.log(req.body)

    const {
      product,
      serviceType,
      servicePrice,
      featured
    } = req.body;

    // Check Product Existence
    const product1 = await Product.findById(product);
    if(!product1) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Related product does not exist!" }] });
    }

    // Check Service Existence
    const checkExistence = await Service.find({
      product,
      serviceType 
    })
    if(checkExistence.length > 0){
      return res.status(400).json({ errors: [{ msg: "Service already exists!" }] })
    }

    const service = new Service()
    service.productName = product1.name;
    service.product = product;
    service.serviceType = serviceType;
    service.servicePrice = servicePrice;
    service.featured = featured;

    await service.save()

    res.status(200).json({
      msg: "Service is added successfully",
      service
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Update a Service
router.put('/:serviceId', async (req, res) => {
  
  try {

    const { 
      // productOfService, NOT PERMITTED
      serviceType,
      servicePrice, 
      featured
    } = req.body

    const service = await Service.findById(req.params.serviceId);

    service.serviceType = serviceType
    service.servicePrice = servicePrice
    service.featured = featured

    await service.save()

    res.status(200).json({
      msg: "Service is updated successfully",
      service
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Delete a Service
router.delete('/:serviceId', async (req, res) => {  
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) {
      return res.json({ errors: [{ msg: "Service not found!" }] })
    }

    // Check if any order related with that service
    const order = await Order.findOne( {
      "serviceList.service": req.params.serviceId
    })
    if (order) {
      return res.status(400).json({ errors: [{ msg: "You can not delete this service because there are some orders related with this service" }] })
    }

    await service.remove()

    res.status(200).json({
      msg: "Service is deleted successfully",
      service
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get All Services
router.get('/', async (req, res) => {
  
  try {

    const serviceList = await Service.find({})
    res.status(200).json(serviceList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Get A Single Service
router.get('/info/:serviceId', async (req, res) => {

  try{
    
    const service = await Service.findById(req.params.serviceId);

    res.status(200).json(service);

  } catch (err) {
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: "Service not found" }] })
    }
    res.status(500).send("Server Error");
  }
})


// Query Services
router.get('/query', async (req, res) => {
  
  try {
    const searched = req.query.searched
    if(!searched) {
      // Do SMT
    }

    // const serviceList = await Service.find(
    //   {serviceType: {
    //     $regex: new RegExp(searched)
    //   }}
    // )
    const serviceList = await Service.find({
      $or: [
        {
          productName: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        },
        {
          serviceType: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        }
      ]
    });

    res.status(200).json(serviceList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})





module.exports = router;
