import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/core/models/movie.model/movie.model';
import { User } from 'src/core/models/user.model/user.model';
import { Favorite } from 'src/core/models/favorite.model/favorite.model';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectModel(Favorite) private favoriteModel: typeof Favorite,
    @InjectModel(Movie) private movieModel: typeof Movie,
  ) {}

  async getAll(user_id: string) {
    const favorites = await this.favoriteModel.findAll({
      where: { user_id },
      include: [{ model: Movie }, { model: User }],
    });

    return {
      success: true,
      message: "Foydalanuvchining sevimli kinolari",
      data: favorites,
    };
  }

  async createfavorite(payload: { user_id: string; movie_id: string }) {
    const { user_id, movie_id } = payload;

    if (!user_id) throw new BadRequestException('User ID notogri');
    if (!movie_id) throw new BadRequestException('Movie ID notogri');

    const movie = await this.movieModel.findOne({ where: { movie_id } });
    if (!movie) throw new NotFoundException('Kino topilmadi');

    const favorite = await this.favoriteModel.create({ user_id, movie_id });

    return {
      success: true,
      message: "Kino sevimlilar royxatiga qoshildi",
      data: {
        id: favorite.id,
        movie_id: movie.movie_id,
        movie_title: movie.title,
      },
    };
  }

  async removefavorite(user_id: string, movie_id: string) {
    const deleted = await this.favoriteModel.destroy({
      where: { user_id, movie_id },
    });

    if (!deleted)
      throw new NotFoundException(
        'Bu kino sevimlilar royxatidan topilmadi yoki allaqachon ochirib yuborilgan',
      );

    return {
      success: true,
      message: "Kino sevimlilar royxatidan ochirildi",
    };
  }
}
