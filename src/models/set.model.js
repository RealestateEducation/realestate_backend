/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true,
        },
        premium: {
            type: Boolean,
            required: true,
            default: false
        },
        subject: {
            type:String,
            required:true,
        },
        totalCards:{
            type: Number,
            required:false,
            default:0
        }

    },
    {
        timestamps: true,
    },

);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model('set', productSchema);
module.exports = Product;
