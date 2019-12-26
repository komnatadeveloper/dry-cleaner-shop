const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");
const {   fileCheck, fileCheckForUpdate,  resizeFile} = require('../../utils/UploadFile')
const Product = require('../../models/Product')
const Service = require('../../models/Service')

const authAdmin = require('../../middleware/authAdmin')


// Add a Product(image, name)
router.post('/', authAdmin,  fileCheck.single('image'),  async (req, res) => {

  try {
    const product = new Product();
    product.image = await resizeFile(req.file, 500, 500)
    product.name = req.body.name;

    // Check if there is an existing product with the same name
    const doesExist = await Product.findOne( { name: req.body.name })
    if( doesExist ) {
      // return res.status(400).json({msg: "Product with this name already exists!"})
      return res
        .status(400)
        .json({ errors: [{ msg: "Product with this name already exists!" }] });
    }
    // console.log(req.file);
    await product.save()
    res.status(200).json({
      msg: 'Product is uploaded successfully', 
      product: {
        name: product.name,
        _id: product._id
      }
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Delete a Product
router.delete(
  "/:productId",
  authAdmin,
  async (req, res) => {
    try {
      const productId = req.params.productId;
      // Check if product exists
      const product = await Product.findById(productId);
      if( !product ) {
        return res.status(400).json(
          { errors: [{ msg: "Product Not Found!" }] }
          )
      }

      // Check if there is any service related with that product
      const service = await Service.findOne({
        product: productId
      });
      if( service) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "There are services related with this Product." }]
          });
      }

      await product.remove();

      res.json({
        msg: "Product is deleted successfully",
        product: {
          name: product.name,
          _id: product._id
        }
      });

      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);


// Update a Product(image, name)
router.put(
  "/:productId",
  authAdmin,
  fileCheckForUpdate.single("image"),

  async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);

      // Check if update also photo
      if (req.file) {
        product.image = await resizeFile(req.file, 500, 500);
      }

      // Check if name will be updating
      if (req.body.name && 
        req.body.name !== "null" &&
        req.body.name !== "undefined" &&
        req.body.name !== ""
        ) {
        product.name = req.body.name;
      } else {
        // DO SMT
        // console.log("PROTECTION SUCCESSFULL");
      }

      // Check if is there already any product with the updated name
      const checkDuplication = await Product.findOne( { name: req.body.name})
      if( checkDuplication ) {
        if(checkDuplication._id !== req.params.productId) {
          return res.status(400).json({
            errors: [{ msg: "There is another product with that name!" }]
          });
        }
      }
      
      // console.log(req.file);
      await product.save();
      res.status(200).json({
        msg: "Product is updated successfully",
        product: {
          name: product.name,
          _id: product._id
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);




// Query Products
router.get('/query', async (req, res) => {
  
  try {
    const searched = req.query.searched
    if(!searched) {
      // Do SMT
    }

    const productList = await Product.find({
      name: {
        $regex: new RegExp(searched),
        $options: "i" // case Insensitive
      }  
    }).select('-image');

    res.status(200).json(productList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})





// Get all Products(image, name)
router.get('/', authAdmin,  async (req, res) => {

  try {
    const products = await Product.find({});


    res.status(200).json(products)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Get all Products (id, name, WITHOUT images)
router.get("/without-image", authAdmin, async (req, res) => {
  try {
    const products = await Product.find().select('-image');

    res.status(200).json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;