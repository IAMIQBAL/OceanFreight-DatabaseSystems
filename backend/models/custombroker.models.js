const sql = require('./db.js')

const cbInfo = function(cbInfo){
    this.CBId = cbInfo.CBId;
    this.CBName = cbInfo.CBName;
    this.CBPhNo = cbInfo.CBPhNo;
    this.recID = cbInfo.recID;
    this.status = cbInfo.status;
    this.passwd = cbInfo.passwd;
}

// Signup
cbInfo.create = (newCBInfo, result) => {
    sql.query("INSERT INTO Custom_Broker SET ?", newCBInfo, (err, res) => {
        if (err) {
            console.log("Custom_Broker not created", err);
            result(null, err);
            return;
        }
        console.log("Signed up");
        result(null, {id: res.senID})
    })
}

// Login
cbInfo.login = (cbId, passwd, result) => {
    sql.query("SELECT * FROM Custom_Broker WHERE cbId = "+ cbId + " and passwd = " + passwd, (err, res) => {
    if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
    }
    result(null, res);
    if (Object.keys(res).length != 0){
        sql.query("UPDATE Custom_Broker SET status = 1 WHERE CBId = "+ cbId);
    }
    });
}

// Delete products
cbInfo.update = (cbId, passwd, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        console.log(JSON.parse(JSON.stringify(res)))
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('DELETE FROM product WHERE status = "A"', (err, res) => {
                    if (err) {
                        console.log("status updated", err);
                        result(null, err);
                        return;
                    }
                })
            }
        }
        result(null);
    })
}

// Ship tracking
cbInfo.getShipInfo = (cbId, passwd, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        console.log(JSON.parse(JSON.stringify(res)))
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('SELECT * FROM ship', (err, res) => {
                    if (err) {
                        // console.log("status updated", err);
                        result(null, err);
                        return;
                    }
                    result(null, res);
                })
            }
        }
    })
}

cbInfo.getSenderInfo = (cbId, passwd, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        console.log(JSON.parse(JSON.stringify(res)))
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('SELECT senID, senName, senPhNo, product, price, src FROM sender', (err, res) => {
                    if (err) {
                        // console.log("status updated", err);
                        result(null, err);
                        return;
                    }
                    result(null, res);
                })
            }
        }
    })
}

cbInfo.getReceiverInfo = (cbId, passwd, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        console.log(JSON.parse(JSON.stringify(res)))
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('SELECT recID, recName, recPhNo, product, price, dest FROM receiver', (err, res) => {
                    if (err) {
                        // console.log("status updated", err);
                        result(null, err);
                        return;
                    }
                    result(null, res);
                })
            }
        }
    })
}

module.exports = cbInfo;