const { ObjectId } = require('mongodb');
class Cart {
  constructor(client) {
    this.Cart = client.db().collection('GioHang');
  }
  //quan ly theo kieu: moi gio hang la 1 user - 1 sach - 1 so luong sach
  extractCartData(payload) {
    const cartItem = {
      maDocGia: payload.maDocGia || '',
      maSach: payload.maSach || '',
      soLuong: parseInt(payload.soLuong) || 1,
    };
    Object.keys(cartItem).forEach((key) => cartItem[key] === undefined && delete cartItem[key]);
    return cartItem;
  }

  async addToCart(payload) {
    const item = this.extractCartData(payload);

    const filter = {
      maDocGia: item.maDocGia,
      maSach: item.maSach,
    };

    const update = {
      $inc: { soLuong: item.soLuong },
    };
    return await this.Cart.findOneAndUpdate(filter, update, {
      upsert: true,
      returnDocument: 'after',
    });
  }

  async getCart(maDocGia) {
    return await this.Cart.aggregate([
      { $match: { maDocGia: maDocGia } },
      {
        $lookup: {
          from: 'Sach', //ket noi collection Sach
          localField: 'maSach',
          foreignField: 'maSach',
          as: 'bookDetails',
        },
      },
      { $unwind: '$bookDetails' },
    ]).toArray();
  }

  async update(id, payload) {
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
    const update = this.extractCartData(payload);
    return await this.Cart.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
  }

  async deleteItem(id) {
    return await this.Cart.deleteOne({ _id: new ObjectId(id) });
  }

  async clearCart(maDocGia) {
    return await this.Cart.deleteMany({ maDocGia: maDocGia });
  }
}

module.exports = Cart;
