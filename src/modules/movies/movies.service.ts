import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movie.model/movie.model';
import { MovieFile } from 'src/core/models/movie-file.model/movie-file.model';
import { Op } from 'sequelize';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private movieModel: typeof Movie,
    @InjectModel(MovieFile) private movieFileModel: typeof MovieFile,
  ) {}

  async createMovie(userId: string, payload: MovieDto, poster: string) {
    const newMovie = await this.movieModel.create({
      ...payload,
      created_by: userId,
      poster_url: poster
    });

    return {
      success: true,
      message: 'Yangi film qoshildi',
      data: newMovie
    };
  }

  async getMovies(
    page = 1,
    limit = 10,
    search?: string,
    category?: string,
    subscription_type?: string
  ) {
    const offset = (page - 1) * limit;
    const where: any = {};

    if (subscription_type) where.subscription_type = subscription_type;

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const include: any[] = [];
    if (category) {
      include.push({
        association: 'categories',
        where: {
          name: { [Op.iLike]: `%${category}%` }
        },
        required: true
      });
    }

    const { rows: movies, count } = await this.movieModel.findAndCountAll({
      where,
      include,
      offset,
      limit
    });

    return {
      success: true,
      data: {
        movies,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit),
        }
      }
    };
  }

  async getMovieBySlug(slug: string) {
    const movie = await this.movieModel.findOne({
      where: { slug },
      include: ['categories', 'files', 'reviews']
    });

    if (!movie) throw new NotFoundException('Film topilmadi');

    return {
      success: true,
      data: movie
    };
  }
  async updateMovie(id: string, payload: MovieDto) {
    const movie = await this.movieModel.findOne({ where: { movie_id: id } });
    if (!movie) throw new NotFoundException('Film topilmadi');
  
    await movie.update(payload);
    return {
      success: true,
      message: 'Film yangilandi',
      data: movie
    };
  }
  
  async deleteMovie(id: string) {
    const movie = await this.movieModel.findOne({ where: { movie_id: id } });
    if (!movie) throw new NotFoundException('Film topilmadi');
  
    await movie.destroy();
    return {
      success: true,
      message: 'Film ochirildi'
    };
  }
  
}

