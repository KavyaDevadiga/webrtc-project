import { userInterface } from "@src/interfaces";
import { GoogleKey } from "@src/models";
import { DataTypes, Model, Sequelize } from "sequelize";

export class User
  extends Model<
    userInterface.IUserAttributes,
    userInterface.IUserCreationAttributes
  >
  implements userInterface.IUserAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public googleId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public createGoogleKey!: (
    googleKey: Partial<userInterface.IGoogleKeysAttributes>
  ) => Promise<any>;
  static associate() {
    User.hasMany(GoogleKey, { foreignKey: "userId" });
  }
}

// Initialize the User model
export const initializeUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      googleId: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
};
