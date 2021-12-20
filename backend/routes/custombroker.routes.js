module.exports = app => {
    const cb = require("../controllers/custombroker.controllers.js");

    app.post("/cb", cb.create);
    app.get("/cb/:cbId/:passwd", cb.loggedIn);
    app.get("/cbdel/:cbId/:passwd/", cb.update);
    app.get("/ship/:cbId/:passwd", cb.getShipInfo);
    app.get("/cbgetsender/:cbId/:passwd", cb.getSenderInfo);
    app.get("/cbgetreceiver/:cbId/:passwd", cb.getReceiverInfo);
}