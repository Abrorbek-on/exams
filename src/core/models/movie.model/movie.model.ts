import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../user.model/user.model';
import { Category } from '../category.model/category.model';
import { MovieCategory } from '../movie-category.model/movie-category.model';
import { MovieFile } from '../movie-file.model/movie-file.model';
import { Review } from '../review.model/review.model';
@Table({ tableName: 'movies' })
export class Movie extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  movie_id: string;

  @Column(DataType.STRING)
  title: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.STRING)
  release_year: string;

  @Column(DataType.STRING)
  duration_minutes: string;

  @Column(DataType.STRING)
  poster_url: string;

  @Column(DataType.DECIMAL(3, 1))
  rating: number;

  @Column(DataType.STRING)
  subscription_type: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  created_by: string;

  @BelongsTo(() => User)
  creator: User;

  @BelongsToMany(() => Category, () => MovieCategory)
  categories: Category[];

  @HasMany(() => MovieFile)
  files: MovieFile[];

  @HasMany(() => Review)
  reviews: Review[];
}
