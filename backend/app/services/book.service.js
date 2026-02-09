const { ObjectId } = require('mongodb');
class Book {
  constructor(client) {
    this.Book = client.db().collection('Sach');
  }
  //Cac ham se o day
}
module.exports = Book;
