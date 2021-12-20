const CBInfo = require("../models/custombroker.models.js");

exports.create = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    const cb = new CBInfo({
        CBId: req.body.CBId,
        CBName: req.body.CBName,
        CBPhNo: req.body.CBPhNo,
        recID: req.body.recID,
        status: req.body.status,
        passwd: req.body.passwd
    });

    CBInfo.create(cb, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.send(data);
    });
};

exports.loggedIn = (req, res) => {
    CBInfo.login(req.params.cbId, req.params.passwd, (err, data) => {
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

exports.update = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    CBInfo.update(req.params.cbId, req.params.passwd, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        else res.sendStatus(200);
    });
};

exports.getShipInfo = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    CBInfo.getShipInfo(req.params.cbId, req.params.passwd, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        }
        else res.send(data);
    });
};

exports.getSenderInfo = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    CBInfo.getSenderInfo(req.params.cbId, req.params.passwd, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        }
        else res.send(data);
    });
};

exports.getReceiverInfo = (req, res) => {
    if (!req.body){
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }
    CBInfo.getReceiverInfo(req.params.cbId, req.params.passwd, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Server side Error"
            });
        }
        else res.send(data);
    });
};