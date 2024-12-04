import { Document } from "mongoose";
import { FindAttributeOptions, Model, Optional, WhereOptions } from "sequelize";
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
    options?: Object,
    attributes?: FindAttributeOptions
  ): Promise<Model<IUserAttributes, IUserCreationAttributes>[]>;
  create(
    data: MakeNullishOptional<IUserCreationAttributes>
  ): Promise<Model<IUserAttributes, IUserCreationAttributes>>;

  addGoogleKeys(
    user: Model<IUserAttributes, IUserCreationAttributes>,
    googleKeyData: Partial<IGoogleKeysAttributes>
  ): Promise<any>;
}

export interface IUserAttributesWithGoogleKeys extends IUserAttributes {
  googleKeys: Partial<IGoogleKeysAttributes>[];
}

export interface IUserSerializer {
  toUserLIst(users: User[]): IUserAttributes[];
  toUserDetails(user: User): IUserAttributes;
  toResponseWithGoogleKey(
    user: User,
    googleKeyData: Partial<IGoogleKeysAttributes>[]
  ): IUserAttributesWithGoogleKeys;
}
export interface IUserAttributes {
  id?: string;
  name: string;
  email: string;
  googleId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  //association methods
  addGoogleKeys?: (
    googleKeys: Partial<IGoogleKeysAttributes>
  ) => Promise<IGoogleKeysAttributes[]>;
}

export interface IGoogleKeysAttributes {
  id?: string;
  googleAccessKey: string;
  googleRefreshKey: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "id"> {}

export interface IGoogkeKeyCreationAttributes
  extends Optional<IGoogleKeysAttributes, "id"> {}

export interface UserCreationOptionalAttributes
  extends Optional<
    IUserCreationAttributes,
    NullishPropertiesOf<IUserCreationAttributes>
  > {}

export type UserWhereOptionType = WhereOptions<IUserAttributes>;
