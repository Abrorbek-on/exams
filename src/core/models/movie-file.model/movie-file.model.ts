import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Movie } from '../movie.model/movie.model';
import { VideoQuality } from 'src/core/types/types';

@Table({ tableName: 'movie_files' })
export class MovieFile extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  moviefiles_id: string;

  @ForeignKey(() => Movie) @Column(DataType.UUID)
  movie_id: string;

  @Column(DataType.ENUM(...Object.values(VideoQuality)))
  quality: VideoQuality;

  @Default('uz') @Column(DataType.STRING)
  language: string;

  @BelongsTo(() => Movie)
  movie: Movie;
}
