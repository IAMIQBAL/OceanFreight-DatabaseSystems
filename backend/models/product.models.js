const sql = require('./db.js')

const productInfo = function(productInfo){
    this.contNo = productInfo.contNo;
    this.product = productInfo.product;
    this.Qnty = productInfo.Qnty;
    this.totalprice = productInfo.totalprice;
    this.status = productInfo.status;
    this.shipNo = productInfo.shipNo;
    this.recID = productInfo.recID;
    this.CBId = productInfo.CBId;
}

// New product request - Receiver Requests
productInfo.create = (recieverId, passwd, newProductInfo, result) => {
    sql.query("SELECT status FROM receiver WHERE recID = " + recieverId + " and passwd = " + passwd, newProductInfo, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query("INSERT INTO product SET ?", newProductInfo, (err, res) => {
                    if (err) {
                        console.log("product not created", err);
                        result(null, err);
                        return;
                    }
                })
            }
        }
    })
}

// Update Status - Sender Updates
productInfo.update = (senderId, passwd, contNo, result) => {
    sql.query("SELECT status FROM sender WHERE senID = " + senderId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('UPDATE product SET status = "A" WHERE contNo = ' + contNo, (err, res) => {
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

module.exports = productInfo;