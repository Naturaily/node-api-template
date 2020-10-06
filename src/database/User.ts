import { Column, Model, AllowNull, PrimaryKey, Table, Unique, AutoIncrement } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Unique
  @Column
  name: string;
}
