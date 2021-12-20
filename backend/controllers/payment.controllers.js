const paymentInfo = require("../models/payment.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const payment = new paymentInfo({
        sendID: req.body.sendID,
        recID: req.body.recID,
        srpayment: req.body.srpayment,
        srpay_method: req.body.srpay_method,
        srpay_status: req.body.srpay_status
    });

    paymentInfo.create(req.params.recID, req.params.passwd, payment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    paymentInfo.update(req.params.senID, req.params.passwd, req.params.recID, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.sendStatus(200);
    });
};