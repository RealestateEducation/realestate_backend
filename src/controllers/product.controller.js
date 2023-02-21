const {productService} = require('../services');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const getProducts = catchAsync(async (req, res) => {
  //const userFilters = pick(req.user, ["location_id", "customer_id"]);
  const filters = pick(req.query, ['vendor', 'isAvailable', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  //let filter = Object.assign(queryFilters, userFilters);
  const result = await productService.queryProducts(
    filters,
    options,
    'vendor',
    'name',
  );
  res.send(result);
});
const getAllProducts = catchAsync(async (req, res) => {
  let product = await productService.getAllProducts();
  res.status(200).send(product);
});

const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.id);
  res.send(result);
});
const createProduct = catchAsync(async (req, res) => {
  console.log(req);
  const result = await productService.createProduct(req.body);
  res.send(result);
});
const updateProduct = catchAsync(async (req, res) => {
  const result = await productService.updateProduct(req.params.id, req.body);
  res.send(result);
});
const deleteProduct = catchAsync(async (req, res) => {
  const product = await productService.deleteProductById(req.params.id);
  res.send(product);
});
module.exports = {
  getProducts,
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
