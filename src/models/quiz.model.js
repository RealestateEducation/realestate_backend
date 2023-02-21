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
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'questions'
            }
        ],
           attempt:[
               {
                   type: mongoose.Schema.Types.ObjectId,
                   ref: 'users'
               }
           ],
        author: {
            type: String,
            required: false
        }

    },
    {
        timestamps: true,
    },

);
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
const Product = mongoose.model('quiz', productSchema);
module.exports = Product;