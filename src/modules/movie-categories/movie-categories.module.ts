import { Module } from '@nestjs/common';
import { MovieCategoriesController } from './movie-categories.controller';
import { MovieCategoriesService } from './movie-categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieCategory } from 'src/core/models/movie-category.model/movie-category.model';

@Module({
  imports: [SequelizeModule.forFeature([MovieCategory])],
  controllers: [MovieCategoriesController],
  providers: [MovieCategoriesService]
})
export class MovieCategoriesModule {}
