const mongoose = require('mongoose');
const connectionURL = "mongodb://127.0.0.1:27017/e-commerce-api";

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const Product = mongoose.model('Product', {
    name: {
        type: String,
        
    }
});