import { Document } from "mongoose";
import { Model, Optional, WhereOptions } from "sequelize";
import {
  MakeNullishOptional,
  NullishPropertiesOf,
} from "sequelize/types/utils";

export interface User {
  name: string;
  email: string;
}

export interface UnitUser extends User {
  entityId: string;
}

export interface IUserModel extends Document, UnitUser {
  _id: string;
}

export interface IUserRepository {
  get(
    options?: Object
  ): Promise<Model<IUserAttributes, IUserCreationAttributes>[]>;
  add(
    data: MakeNullishOptional<IUserCreationAttributes>
  ): Promise<Model<IUserAttributes, IUserCreationAttributes>>;
}
export interface IUserAttributes {
  id: string;
  name: string;
  email: string;
  googleId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

export interface UserCreationOptionalAttributes
  extends Optional<
    IUserCreationAttributes,
    NullishPropertiesOf<IUserCreationAttributes>
  > {}

export type UserWhereOptionType = WhereOptions<IUserAttributes>;
