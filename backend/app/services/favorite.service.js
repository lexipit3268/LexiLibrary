class FavoriteService {
  constructor(client) {
    this.Favorite = client.db().collection('YeuThich');
  }
}

module.exports = FavoriteService;
