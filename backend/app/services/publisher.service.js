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

  async findById(id) {
    if (!id) return null;
    return await this.Publisher.findOne({ maNXB: id });
  }

  async update(id, payload) {
    const updateData = this.extractPublisherData(payload);
    const result = await this.Publisher.findOneAndUpdate(
      { maNXB: id },
      { $set: updateData },
      { returnDocument: 'after' },
    );
    if (!result) {
      return null;
    }
    return result;
  }

  async delete(id) {
    if (!id) return null;
    return await this.Publisher.deleteOne({ maNXB: id });
  }

  async deleteAll() {
    const result = await this.Publisher.deleteMany({});
    return result;
  }
}

module.exports = PublisherService;
