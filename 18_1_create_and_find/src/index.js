const express = require('express');
require('./db/mongoose');
const router = require('./routers/productRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server is up on port - ${port}`);
});