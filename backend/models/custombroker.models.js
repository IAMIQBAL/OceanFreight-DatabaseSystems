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

module.exports = cbInfo;