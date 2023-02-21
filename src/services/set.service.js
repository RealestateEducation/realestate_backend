/* eslint-disable prettier/prettier */
const { Set } = require("../models")
const ApiError = require('../utils/APIError');
const httpStatus = require('http-status');
var mongoose = require('mongoose');

const createSet = async (body) => {
    const order = await Set.create(body);
    return order;

}


const querySets = async (
    filter,
    options,
) => {
    const products = Set.paginate(
        filter,
        options,
    );
    return products;
};

const getSetById = async(id) => {
const response = await Set.findById(id);
return response;
}

const updateSet = async (id, update) => {
    console.log('idddddddddddd',id,'upddateeeeeee',update);
    const product = await getSetById(id);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Set not found.');
    }
    Object.assign(product, update);
    await product.save();
    return product;
};

const deleteSet = async (id) => {
    const set = await getSetById(id);
    if (!set) {
        return 'Cannot find Set'
    }
    await set.remove();
    return set;
}

module.exports = {
 createSet,
 querySets,
 getSetById,
 updateSet,
 deleteSet
};