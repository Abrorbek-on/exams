import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user.model/user.model';
import { Movie } from '../movie.model/movie.model';

@Table({ tableName: 'reviews' })
export class Review extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  review_id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.UUID, allowNull: false })
  movie_id: string;

  @BelongsTo(() => Movie)
  movie: Movie;

  @Column({ type: DataType.FLOAT, allowNull: false })
  rating: number;

  @Column({ type: DataType.STRING, allowNull: true })
  comment: string;
}
