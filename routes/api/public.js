const express = require("express");
const router = express.Router();
const path = require('path')

const Public = require("../../models/Public");
const Product = require("../../models/Product");
const Service = require("../../models/Service");
const authAdmin = require('../../middleware/authAdmin')
const { fileCheck, resizeFile } = require('../../utils/UploadFile')


// Serve Hero Image as jpeg
router.get('/hero', async (req,res) => {
  try {

    const heroImg = await Public.findOne({name: 'hero'})

    if (! heroImg) {

      var options = {

        root: path.join('images/', 'Hero/'),
        headers: {}


      }

      var fileName = 'dry-cleaner-hero.jpg'
      return res.sendFile(fileName, options)
    }

    res.set('Content-Type', 'image/jpeg')

    // console.log(heroImg);
    // console.log('------------------------------------');
    res.send(heroImg.image)
    // res.json(heroImg.image)


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Add Hero Image
router.post(
  '/hero', 
  authAdmin, 
  fileCheck.single('image'), 
  async (req, res) => {
  try {
    const doesExist = await Public.findOne({name: 'hero'});
    if (doesExist) {
      return res.status(400).json('Already exists')
    }

    // console.log(req.file)

    // const encoded = await req.file.toString('base64')
    // const toBuffer = await new Buffer(encoded, 'base64')

    const heroImg = new Public()    
    // const buffer  = await getStream(req.file.stream)
    // const buffer  = new Buffer.from(req.file)
    // heroImg.image  = await Buffer.from(req.file)
    // heroImg.image = encoded
    heroImg.image  = await resizeFile(req.file, 1680, 600)
    heroImg.name = 'hero';

    // console.log(heroImg.image);

    await heroImg.save()
    res.status(200).json('File is uploaded')

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

// Update Hero Image
router.put(
  '/hero', 
  authAdmin, 
  fileCheck.single('image'), 
  async (req, res) => {
  try {
    const hero = await Public.findOne({name: 'hero'});
    if (!hero) return res.json('No Hero Image to Update')
    hero.image = await resizeFile(req.file, 1680, 600)
    hero.name = 'hero';
    // console.log(req.body);
    // console.log(req.file);
    // console.log(heroImg);
    await hero.save()

    res.status(200).json('Hero Image is updated')
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})









// ----------------- TEST as a BUFFEr
// Serve Hero Image as jpeg
router.get('/product/:productId', async (req, res) => {
  try {


    const product = await Public.findById(req.params.productId)
    console.log(product);
    console.log('TEST');

    res.json( product)



  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }


})


// Serve Featured Services
router.get( '/featured-services', async (req, res) => {
  try {
    const featuredServices = await Service.find({});
    

    res.status(200).json(featuredServices)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Serve Single Product Pic
router.get( '/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId)
    
    if (!product) {
      return res.status(400).json()
    }

    res.set('Content-Type', 'image/jpeg')
    res.send(product.image);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


// Serve Single Service Pic
router.get( '/services/:serviceId', async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);    
    if (!service) {
      return res.status(400).json()
    }
    res.set('Content-Type', 'image/jpeg')
    res.send(service.image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})




module.exports = router;
