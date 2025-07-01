import { Module } from '@nestjs/common';
import { MovieFilesController } from './movie-files.controller';
import { MovieFilesService } from './movie-files.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieFile } from 'src/core/models/movie-file.model/movie-file.model';

@Module({
  imports: [SequelizeModule.forFeature([MovieFile])],
  controllers: [MovieFilesController],
  providers: [MovieFilesService]
})
export class MovieFilesModule {}
