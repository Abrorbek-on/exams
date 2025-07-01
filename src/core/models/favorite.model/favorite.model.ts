import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../user.model/user.model';
import { Movie } from '../movie.model/movie.model';


@Table({ tableName: 'favorites' })
export class Favorite extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  favorite_id: string;

  @ForeignKey(() => User) @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => Movie) @Column(DataType.UUID)
  movie_id: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Movie)
  movie: Movie;
}