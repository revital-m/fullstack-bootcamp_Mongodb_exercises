const mongoose = require('mongoose');
const validator = require('validator');
const connectionURL = "mongodb://127.0.0.1:27017/e-commerce-api";

mongoose.connect(connectionURL, {});

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

const newProduct1 = new Product({
    name: 'newProduct1',
    category: 'shoes',
    details: {
        description: "boots black",
        price: 20,
        images: ['xdcfghjk', 'fghjk'],
        phone: '0534566789'
    }
});

const newProduct2 = new Product({
    name: 'newProduct2',
    category: 'shoes',
    details: {
        description: "boots white",
        price: 10,
        images: ['xdcfghjk', 'fghjk'],
        phone: '0534561234'
    }
});

const newProduct3 = new Product({
    name: 'newProduct3',
    category: 'shoes',
    details: {
        description: "boots yellow",
        price: 20,
        images: ['xdcfghjk', 'fghjk'],
        phone: '0534566789'
    }
});

async function saveProduct() {
    try {
        const product1 = await newProduct1.save();
        const product2 = await newProduct2.save();
        const product3 = await newProduct3.save();
    
        console.log(product1);
        console.log(product2);
        console.log(product3);
    } catch (error) {
        console.log(error);
    }
}

// saveProduct();