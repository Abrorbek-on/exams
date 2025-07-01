import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from 'src/core/models/movie.model/movie.model';
import { MovieFile } from 'src/core/models/movie-file.model/movie-file.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie, MovieFile]),
    AuthModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
