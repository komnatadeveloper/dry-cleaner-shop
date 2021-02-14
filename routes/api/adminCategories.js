const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin");
const Category = require("../../models/Category");
const { check, validationResult } = require("express-validator");
const {   fileCheck, fileCheckForUpdate,  resizeFile} = require('../../utils/UploadFile')
const Product = require('../../models/Product')
const Service = require('../../models/Service')

const authAdmin = require('../../middleware/authAdmin')



// Add a Category(image, name)
router.post('/', 
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
      console.log('_clientAdmin -> ', _clientAdmin);
      console.log('routes/api/adminCategories -> add category -> req.body.name -> ', req.body.name);
      const ifCategoryExist = await Category.find({
        name: req.body.name
      });
      console.log('routes/api/adminCategories -> add category -> ifCategoryExist -> ', ifCategoryExist);
      if ( ifCategoryExist.length > 0 ) {
        return res.status(400).json(
          { errors: [{ msg: "Category already exists!" }] }
        );
      }
      const image = await resizeFile(req.file, 500, 500)
      const category = new Category();
      category.image = image;
      category.name = req.body.name;
      await category.save()
      res.status(200).json({
        msg: 'Category has been added successfully', 
        category: {
          name: category.name,
          image: category.image,
          _id: category._id
        }
      });
    } catch (err) {
      console.error(err.message);
      // res.status(500).send("Server Error");
      res.status(500).json(
          { errors: [{ msg: "Server Error" }] }
        );;
    }
  }
); // End of  Add a Category


// Get All Categories
router.get('/', 
  authAdmin,   
  async (req, res) => {
    try {
      const categoryList = await Category.find( {});
      res.status(200).json(categoryList);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
); // End of  Get All Categories


// Delete Single Category
router.delete('/:categoryId', 
  authAdmin,   
  async (req, res) => {
    try {
      const _clientAdmin = await Admin.findById(req.user.id);
      if ( !_clientAdmin || _clientAdmin.isEmployee === true ) {
        return res.status(400).json(
          { errors: [{ msg: "You are not allowed to perform this action!" }] }
        );
      }
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return res.status(400).json({ errors: [{ msg: "Category not found" }] });
      }
    await category.remove();
    res.status(200).json({
      msg: "Category is deleted successfully",
      category
    });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
); // End of Delete Single Category



// Query Categories
router.get('/query', async (req, res) => {  
  try {
    const searched = req.query.searched
    if(!searched) {
      // Do SMT
      return res.status(400).json({ errors: [{ msg: "No Query String!" }] });
    }
    const categoryList = await Category.find({
      name: {
        $regex: new RegExp(searched),
        $options: "i" // case Insensitive
      }  
    }).select('-image');
    res.status(200).json(categoryList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})



module.exports = router;