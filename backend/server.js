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
require("./routes/payment.routes.js")(app);
require("./routes/rent.routes.js")(app);
require("./routes/ship.routes.js")(app);


const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
    console.log("Routes: ");
    console.log("Sender: \n1) /sender (Signup/Post)\n2) /sender/:senID/:passwd (login)")
    console.log("Receiver: \n1) /receiver (Signup/Post)\n2) /receiver/:recID/:passwd (login)")
    console.log("Product: \n1) /product/:receiverId/:passwd (create product) \n2) /product/:senID/:passwd/:contNo (update product status)")
    console.log("Custom Broker: \n1) /cb (Signup/Post)\n2) /cb/:cbId/:passwd (login)\n3) /cbdel/:cbId/:passwd/ (delete product/get)\n4) /ship/:cbId/:passwd (get ship info)\n5) /cbgetsender/:cbId/:passwd (get sender info)\n6) /cbgetreceiver/:cbId/:passwd (get receiver info)")
    console.log("Rent: \n1) /rent/:cbId/:passwd (Custom Broker assigns rent)")
    console.log("Payment: \n1) /payment/:senID/:passwd/:recID (Sender updates payment status) \n2) /payment/:recID/:passwd (Receiver Creates payment entry)")
    console.log("Ship: \n1) /ship/:cbId/:passwd (Custom Broker creates ship entry)")
})