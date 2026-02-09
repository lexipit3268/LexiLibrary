const { ObjectId } = require('mongodb');
class PublisherService {
  constructor(client) {
    this.Publisher = client.db().collection('NhaXuatBan');
  }

  extractPublisherData(payload) {
    const publisher = {
      maNXB: payload.maNXB,
      tenNXB: payload.tenNXB,
      diaChi: payload.diaChi,
    };
    Object.keys(publisher).forEach((key) => publisher[key] === undefined && delete publisher[key]);
    return publisher;
  }
  async test() {
    return 'test';
  }
  async create(payload) {
    const publisher = this.extractPublisherData(payload);
    const result = await this.Publisher.findOneAndUpdate(
      publisher,
      { $set: {} },
      {
        returnDocument: 'after',
        upsert: true,
      },
    );
    return result;
  }
  async find(filter) {
    const cursor = await this.Publisher.find(filter);
    return await cursor.toArray();
  }
  async findById(id) {}
  async update(id) {}
  async delete(id) {}
  async deleteAll() {}
}

module.exports = PublisherService;
