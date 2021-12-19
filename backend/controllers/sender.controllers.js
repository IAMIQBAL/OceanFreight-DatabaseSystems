const SenderInfo = require("../models/sender.model.js");
// const sql = require('./db.js');

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const sender = new SenderInfo({
        senID: req.body.senID,
        senName: req.body.senName,
        senPhNo: req.body.senPhNo,
        product: req.body.product,
        price: req.body.price,
        src: req.body.src,
        status: req.body.status,
        passwd: req.body.passwd
    });

    SenderInfo.create(sender, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.loggedIn = (req, res) => {
    SenderInfo.login(req.params.senID, req.params.passwd, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message: 'Sender not found'
                });
            } else {
                res.status(500).send({
                    message: 'Server side Error'
                });
            }
        }  else {
            res.sendStatus(200);
        }
    })
}