import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Movie } from '../movie.model/movie.model';
import { Category } from '../category.model/category.model';

@Table({ tableName: 'movie_categories', timestamps: false })
export class MovieCategory extends Model {
  @ForeignKey(() => Movie)
  @Column({ type: DataType.UUID })
  movie_id: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID })
  category_id: string;
}
