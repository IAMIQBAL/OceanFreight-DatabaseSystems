const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Ocean-Freight"});
})

require("./routes/sender.routes.js")(app);
require("./routes/receiver.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/custombroker.routes.js")(app);


const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})