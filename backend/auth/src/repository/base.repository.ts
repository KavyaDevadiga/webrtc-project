import { Model, ModelStatic, WhereOptions } from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

export class BaseRepository<
  TAttributes extends {},
  TCreationAttributes extends {}
> {
  private model: ModelStatic<Model<TAttributes, TCreationAttributes>>;

  constructor(model: ModelStatic<Model<TAttributes, TCreationAttributes>>) {
    this.model = model;
  }

  async get(
    options?: WhereOptions<TAttributes>
  ): Promise<Model<TAttributes, TCreationAttributes>[]> {
    return this.model.findAll({ where: options });
  }

  async add(
    data: MakeNullishOptional<TCreationAttributes>
  ): Promise<Model<TAttributes, TCreationAttributes>> {
    return this.model.create(data);
  }
}
