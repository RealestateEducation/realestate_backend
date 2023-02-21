/* eslint-disable prettier/prettier */
const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { setService } = require('../services');
const pick = require('../utils/pick');

const createSet = catchAsync(async (req, res) => {
    const response = await setService.createSet(req.body);
    console.log('response --> ', response);
    res.status(httpStatus.CREATED).send(response);
});


const getSets = catchAsync(async (req, res) => {

    const filters = pick(req.query, ['subject', 'title']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await setService.querySets(
        filters,
        options,
    );
    res.send(result);
});

const getSetById = catchAsync(async(req,res) => {
    const result = await setService.getSetById(req.params.id);
    res.send(result);
})

const updateSet = catchAsync(async (req, res) => {
    const result = await setService.updateSet(req.params.id, req.body);
    res.send(result);
});
const deleteSet = async (req, res) => {
        const response = await setService.deleteSet(req.params.id)
        res.send(response)
   
}


module.exports = {
    createSet,
    getSets,
    getSetById,
    updateSet,
    deleteSet
   
};