const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

// app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ocean-Freight"});
})

require("./routes/supplier.routes.js")(app);
require("./routes/goods.routes.js")(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})