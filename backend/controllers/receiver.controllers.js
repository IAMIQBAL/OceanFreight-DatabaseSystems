const ReceiverInfo = require("../models/receiver.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const receiver = new ReceiverInfo({
        recID: req.body.recID,
        recName: req.body.recName,
        recPhNo: req.body.recPhNo,
        product: req.body.product,
        price: req.body.price,
        dest: req.body.dest,
        status: req.body.status,
        passwd: req.body.passwd
    });

    ReceiverInfo.create(receiver, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.loggedIn = (req, res) => {
    ReceiverInfo.login(req.params.recID, req.params.passwd, (err, data) => {
        if (err){
            if (err.kind == "not_found"){
                res.status(404).send({
                    message: 'Receiver not found'
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