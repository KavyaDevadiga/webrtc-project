import { Document, Model } from "mongoose";

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async get(): Promise<T[]> {
    return this.model.find().exec();
  }

  async add(data: Partial<T>): Promise<T> {
    const instance = new this.model(data);
    return await instance.save();
  }
}
