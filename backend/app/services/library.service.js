const { ObjectId } = require('mongodb');
class LibraryService {
  constructor(client) {
    this.Book = client.db().collection('Sach');
  }
}
module.exports = LibraryService;
