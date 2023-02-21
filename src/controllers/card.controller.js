/* eslint-disable prettier/prettier */
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const {cardService} = require('../services');
const pick = require('../utils/pick');

const createCard = catchAsync(async (req, res) => {
  const response = await cardService.createCard(req.body);
  console.log('response --> ', response);
  res.status(httpStatus.CREATED).send(response);
});

const getCardByFavorite = catchAsync(async(req, res)=>{
  const response = await cardService.getCardByFavorite(req.query);
  res.send(response)
})

const deleteCard = catchAsync(async(req, res)=>{
  const response = await cardService.deleteCard(req.params.id);
  res.send('card has been deleted')
})

const deleteManyCards = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['setId']);
  const response = await cardService.deleteManyCards(
filters,
  );
  res.send(response)
})

const getCards = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['front', 'premium','setId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await cardService.queryCards(
    filters,
    options,
  );
  res.send(result);
});
 
const getCardByLimit = catchAsync(async (req, res) => {
  const result = await cardService.getCardByLimit(req.query);
  res.send(result);
}); 
  
const updateCard = catchAsync(async (req, res) => {
  console.log(req.params.id, req.body);
  const result = await cardService.updateCardById(req.params.id, req.body);
  res.send(result);
});

module.exports = { 
  createCard, 
  getCards, 
  updateCard, 
  getCardByLimit,
  getCardByFavorite,
  deleteCard,
  deleteManyCards
};
