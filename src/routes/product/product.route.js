const express = require('express');
const productController = require('../../controllers/product.controller');
//const multerMiddleware =require("../../middlewares/multer");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter,
});

const router = express.Router();

router
  .route('/')
  .get(productController.getProducts)
  .post(upload.single('image'), productController.createProduct);

router
  .route('/:id')
  .delete(productController.deleteProduct)
  .patch(productController.updateProduct)
  .get(productController.getProduct);

module.exports = router;
