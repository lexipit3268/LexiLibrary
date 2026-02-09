const { ObjectId } = require('mongodb');
class User {
  constructor(client) {
    this.User = client.db().collection('Users');
  }
  //Cac ham se o day
}
module.exports = User;
