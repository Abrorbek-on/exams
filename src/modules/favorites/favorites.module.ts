import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorite } from 'src/core/models/favorite.model/favorite.model';
import { FavouritesService } from './favorites.service';
import { Movie } from 'src/core/models/movie.model/movie.model';
import { User } from 'src/core/models/user.model/user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Favorite, User, Movie]),
  JwtModule

],
  controllers: [FavoritesController],
  providers: [FavouritesService]
})
export class FavoritesModule {}
