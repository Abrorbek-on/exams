import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user.model/user.model';

@Table({ tableName: 'profile' })
export class Profile extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  profile_id: string;

  @ForeignKey(() => User) @Column(DataType.UUID)
  user_id: string;

  @Column({ type: DataType.STRING })
  full_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  country: string;

  @BelongsTo(() => User)
  user: User;
}
