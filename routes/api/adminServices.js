const express = require("express");
const router = express.Router();
// Middleware
const {   fileCheck, fileCheckForUpdate,  resizeFile} = require('../../utils/UploadFile');
const authAdmin = require('../../middleware/authAdmin');
// Models
const Service = require("../../models/Service");
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const Category = require("../../models/Category");
const Admin = require("../../models/Admin");


// Add A Service Connected with a Category
router.post(
  '/', 
  authAdmin, 
  fileCheck.single('image'),
  async (req, res) => {
    try {
      const _clientAdmin = await Admin.findById(req.user.id);
      if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
        return res.status(400).json(
          { errors: [{ msg: "You are not allowed to perform this action!" }] }
        );
      }
      const {
        category,  // => categoryId
        serviceName,
        servicePrice,
        featured
      } = req.body;
      // Check Related Category Existence
      const relatedCategory = await Category.findById(category);
      if(!relatedCategory) {
        return res
          .status(400)
          .send({ errors: [{ msg: "This Category does not exist!" }] });
      }

      // Check Service Existence
      const checkExistence = await Service.find({
        serviceName: {
          $regex: new RegExp(serviceName),
          $options: "i" // case Insensitive
        }
      });
      if(checkExistence.length > 0){
        return res.status(400).json({ errors: [{ msg: "Service already exists!" }] })
      }
      // construct new Service
      const service = new Service();
      service.image = await resizeFile(req.file, 500, 500);
      service.serviceName = serviceName;
      service.categoryName = relatedCategory.name;
      service.category = category; // categoryId
      service.servicePrice = servicePrice;
      service.featured = featured;
      await service.save();
      res.status(200).json({
        msg: "Service is added successfully",
        service
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);



// Update a Service (if image updated)
router.put(
  '/image-updated/:serviceId', 
  authAdmin, 
  fileCheck.single('image'),
  async (req, res) => {  
  try {
    const _clientAdmin = await Admin.findById(req.user.id);
    if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
      return res.status(400).json(
        { errors: [{ msg: "You are not allowed to perform this action!" }] }
      );
    }
    const {
      category,  // => categoryId
      serviceName,
      servicePrice,
      featured,
      isImageUpdated
    } = req.body;
    const service = await Service.findById(req.params.serviceId);
    if(!service) {
      return res
      .status(400)
      .send({ errors: [{ msg: "This Service does not exist!" }] });
    }
    if ( service.serviceName !== serviceName ) {
      const doesExistSameServiceName =  await Service.find({
        serviceName: {
          $regex: new RegExp(serviceName),
          $options: "i" // case Insensitive
        }
      });
      if (doesExistSameServiceName.length > 0) {
        return res.status(400).send({ 
          errors: [{ msg: "There is Another Service with Same Name!" }] 
        });
      }
    }
    // Check Related Category Existence
    console.log('routes/api/adminServices -> update service -> category -> ', category);
    const relatedCategory = await Category.findById(category);
    if(!relatedCategory) {
      return res
        .status(400)
        .send({ errors: [{ msg: "This Category does not exist!" }] });
    }
    // reconstruct Service
    if ( isImageUpdated ) {
      service.image = await resizeFile(req.file, 500, 500);
    }
    service.serviceName = serviceName;
    service.category = category;
    service.categoryName = relatedCategory.name;
    service.servicePrice = servicePrice;
    service.featured = featured;    
    await service.save();
    res.status(200).json({
      msg: "Service is updated successfully",
      service
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});  // End of Update a Service (if image updated)


// Update a Service (if image NOT updated )
router.put(
  '/no-image-update/:serviceId', 
  authAdmin, 
  async (req, res) => {  
  try {
    const _clientAdmin = await Admin.findById(req.user.id);
    if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
      return res.status(400).json(
        { errors: [{ msg: "You are not allowed to perform this action!" }] }
      );
    }
    const {
      category,  // => categoryId
      serviceName,
      servicePrice,
      featured
    } = req.body;
    console.log('routes/api/adminServices -> update service -> req.body -> ', req.body);
    const service = await Service.findById(req.params.serviceId);
    if(!service) {
      return res
        .status(400)
        .send({ errors: [{ msg: "This Service does not exist!" }] });
    }
    if ( service.serviceName !== serviceName ) {
      const doesExistSameServiceName =  await Service.find({
        serviceName: {
          $regex: new RegExp(serviceName),
          $options: "i" // case Insensitive
        }
      });
      if (doesExistSameServiceName.length > 0) {
        return res.status(400).send({ 
          errors: [{ msg: "There is Another Service with Same Name!" }] 
        });
      }
    }
    // Check Related Category Existence
    console.log('routes/api/adminServices -> update service -> category -> ', category);
    const relatedCategory = await Category.findById(category);
    if(!relatedCategory) {
      return res
        .status(400)
        .send({ errors: [{ msg: "This Category does not exist!" }] });
    }
    service.serviceName = serviceName;
    service.category = category;
    service.categoryName = relatedCategory.name;
    service.servicePrice = servicePrice;
    service.featured = featured;    
    await service.save();
    res.status(200).json({
      msg: "Service is updated successfully",
      service
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});  // End of Update a Service (if image NOT updated )



// Delete a Service
router.delete('/:serviceId', authAdmin, async (req, res) => {  
  try {
    const _clientAdmin = await Admin.findById(req.user.id);
    if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
      return res.status(400).json(
        { errors: [{ msg: "You are not allowed to perform this action!" }] }
      );
    }
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
    await service.remove();
    res.status(200).json({
      msg: "Service is deleted successfully",
      service
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Get All Services
router.get('/', authAdmin, async (req, res) => {  
  try {
    const serviceList = await Service.find({})
    res.status(200).json(serviceList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Get A Single Service
router.get('/info/:serviceId', authAdmin, async (req, res) => {
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
router.get('/query', authAdmin, async (req, res) => {  
  try {
    const searched = req.query.searched
    if(!searched) {
      // Do SMT
    }
    const serviceList = await Service.find({
      $or: [
        {
          categoryName: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        },
        {
          serviceName: {
            $regex: new RegExp(searched),
            $options: "i" // case Insensitive
          }
        }
      ]
    }).select('-image');  // for faster query
    res.status(200).json(serviceList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})





module.exports = router;
