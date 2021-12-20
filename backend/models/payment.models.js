const sql = require('./db.js')

const paymentInfo = function(paymentInfo){
    this.sendID = paymentInfo.sendID;
    this.recID = paymentInfo.recID;
    this.srpayment = paymentInfo.srpayment;
    this.srpay_method = paymentInfo.srpay_method;
    this.srpay_status = paymentInfo.srpay_status;
}

// Payment - Created by receiver
paymentInfo.create = (recID, passwd, paymentInfo, result) => {
    sql.query("SELECT status FROM receiver WHERE recID = " + recID + " and passwd = " + passwd, paymentInfo, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query("INSERT INTO pay_method SET ?", paymentInfo, (err, res) => {
                    if (err) {
                        console.log("payment not created", err);
                        result(null, err);
                        return;
                    }
                })
            }
        }
    })
}

// Sender Confirms
paymentInfo.update = (senderId, passwd, recID, result) => {
    sql.query("SELECT status FROM sender WHERE senID = " + senderId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query('UPDATE pay_method SET srpay_status = "R" WHERE recID = ' + recID, (err, res) => {
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

module.exports = paymentInfo;