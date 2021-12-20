const sql = require('./db.js')

const rentInfo = function(rentInfo){
    this.contNo = rentInfo.contNo;
    this.cont_type = rentInfo.cont_type;
    this.lolo = rentInfo.lolo;
    this.cont_rent = rentInfo.cont_rent;
    this.liftoffdate = rentInfo.liftoffdate;
    this.liftonndate = rentInfo.liftonndate;
}

// Payment - Created by receiver
rentInfo.create = (cbId, passwd, rentInfo, result) => {
    sql.query("SELECT status FROM Custom_Broker WHERE CBId = " + cbId + " and passwd = " + passwd, (err, res) => {
        if (err) {
            console.log("Wrong credentials", err);
            result(null, err);
            return;
        }
        if (Object.keys(res).length > 0){
            if (res[0].status != 0){
                sql.query("INSERT INTO rent SET ?", rentInfo, (err, res) => {
                    console.log(rentInfo)
                    if (err) {
                        console.log("rent Info not created", err);
                        result(null, err);
                        return;
                    }
                })
            }
        }
    })
}

module.exports = rentInfo;