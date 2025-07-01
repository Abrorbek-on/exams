import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from '../user.model/user.model';
import { Movie } from '../movie.model/movie.model';

@Table({
  tableName: 'watch_history',
  timestamps: true,
})
export class WatchHistory extends Model<WatchHistory> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  watchhistory_id: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id: string;

  @ForeignKey(() => Movie)
  @Column(DataType.UUID)
  movie_id: string;

  @Column(DataType.INTEGER)
  watched_duration: number;

  @Column(DataType.DECIMAL(5, 2))
  watched_percentage: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Movie)
  movie: Movie;
}