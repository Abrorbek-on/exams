import {Table, Column, Model, DataType, Default, Unique, HasMany} from 'sequelize-typescript';
import { UserRole } from 'src/core/types/types';
import { UserSubscription } from '../user-subscription.model/user-subscription.model';
import { Favorite } from '../favorite.model/favorite.model';
import { Review } from '../review.model/review.model';
import { WatchHistory } from '../watch-history.model/watch-history.model';
import { Movie } from '../movie.model/movie.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  user_id: string;

  @Unique @Column({ type: DataType.STRING })
  username: string;

  @Unique @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password_hash: string;

  @Default(UserRole.USER) @Column(DataType.ENUM(...Object.values(UserRole)))
  role: UserRole;

  @Column({ type: DataType.STRING })
  avatar_url: string;

  @Column({ type: DataType.UUID })
  profile_id: string;

  @Column({ type: DataType.STRING })
  full_name: string;

  @Column({ type: DataType.STRING })
  phone: string;

  @Column({ type: DataType.STRING })
  country: string;

  @HasMany(() => UserSubscription)
  subscriptions: UserSubscription[];

  @HasMany(() => Favorite)
  favorites: Favorite[];

  @HasMany(() => Review)
  reviews: Review[];

  @HasMany(() => WatchHistory)
  watchHistory: WatchHistory[];

  @HasMany(() => Movie)
  movies: Movie[];
}