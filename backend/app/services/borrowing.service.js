const { ObjectId } = require('mongodb');
class Borrowing {
  constructor(client) {
    this.Borrowing = client.db().collection('Borrowings');
  }
  //Cac ham se o day
}
module.exports = Borrowing;
