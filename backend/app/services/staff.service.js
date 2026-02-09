const { ObjectId } = require('mongodb');
class Staff {
  constructor(client) {
    this.Staff = client.db().collection('Staffs');
  }
  //Cac ham se o day
}
module.exports = Staff;
