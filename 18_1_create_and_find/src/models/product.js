const mongoose = require('mongoose');
const validator = require('validator');

const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
    },
    details: {
        description: {
            type: String,
            required: true,
            minLength: [10, 'Must be at least 10 characters'],
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        images: {
            type: [String],
            minItems: 2,
        },
        phone: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isMobilePhone(value, 'he-IL')) {
                    throw Error('Must be an Israeli mobile phone');
                }
            }
        },
        date: {
            type: Date,
            default: Date.now(),
        }
    },
});

module.exports = Product;