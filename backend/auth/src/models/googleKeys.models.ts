import { userInterface } from "@src/interfaces";
import { User } from "@src/models";
import { DataTypes, Model, Sequelize } from "sequelize";
export class GoogleKey
  extends Model<
    userInterface.IGoogleKeysAttributes,
    userInterface.IGoogleKeysAttributes
  >
  implements userInterface.IGoogleKeysAttributes
{
  public id!: string;
  public googleAccessKey!: string;
  public googleRefreshKey!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    GoogleKey.belongsTo(User, { foreignKey: "userId" });
  }
}

export const initializeGoogleKeyModel = (sequelize: Sequelize) => {
  GoogleKey.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      googleAccessKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleRefreshKey: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "GoogleKey",
      timestamps: true,
    }
  );
};
