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
    const cursor = await this.Cart.find({ maDocGia: maDocGia });
    return cursor.toArray();
  }

  async deleteItem(id) {
    return await this.Cart.deleteOne({ _id: new ObjectId(id) });
  }

  async clearCart(maDocGia) {
    return await this.Cart.deleteMany({ maDocGia: maDocGia });
  }
}

module.exports = Cart;
