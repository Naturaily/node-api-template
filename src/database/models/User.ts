import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  email: string;
  name: string;
}

export class User extends Model<UserAttributes> {
  public id!: number;
  public email!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    { sequelize },
  );
