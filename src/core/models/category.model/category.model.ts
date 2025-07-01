import {
  Table, Column, Model, DataType, BelongsToMany
} from 'sequelize-typescript';
import { Movie } from '../movie.model/movie.model';
import { MovieCategory } from '../movie-category.model/movie-category.model';

@Table({ tableName: 'categories' })
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4
  })
  category_id: string;

  @Column(DataType.STRING)
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  slug: string;

  @Column(DataType.TEXT)
  description: string;

  @BelongsToMany(() => Movie, () => MovieCategory)
  movies: Movie[];
}
