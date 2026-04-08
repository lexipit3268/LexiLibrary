const { ObjectId } = require('mongodb');

class FavoriteService {
  constructor(client) {
    this.Favorite = client.db().collection('YeuThich');
    this.Favorite.createIndex({ maDocGia: 1, maSach: 1 }, { unique: true }).catch((err) =>
      console.error('Lỗi tạo Index:', err),
    );
  }

  extractFavoriteData(payload) {
    const favorite = {
      maDocGia: payload.maDocGia,
      maSach: payload.maSach,
    };
    Object.keys(favorite).forEach((key) => favorite[key] === undefined && delete favorite[key]);
    return favorite;
  }

  async find(filter) {
    const pipeline = [
      { $match: filter },

      {
        $lookup: {
          from: 'Sach',
          localField: 'maSach',
          foreignField: 'maSach',
          as: 'bookDetails',
        },
      },

      // moi item 1 cuon sach
      { $unwind: '$bookDetails' },
    ];

    const cursor = await this.Favorite.aggregate(pipeline);
    return cursor.toArray();
  }

  async create(payload) {
    const favorite = this.extractFavoriteData(payload);
    const result = await this.Favorite.insertOne(favorite);
    return result;
  }

  async delete(id) {
    return await this.Favorite.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteAll(maDocGia) {
    const result = await this.Favorite.deleteMany({ maDocGia: maDocGia });
    return result;
  }
}

module.exports = FavoriteService;
