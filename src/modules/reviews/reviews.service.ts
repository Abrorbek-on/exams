import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from 'src/core/models/review.model/review.model';
import { CreateReviewDto } from './dto/review.dto';
import { User } from 'src/core/models/user.model/user.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  async create(movie_id: string, user_id: string, payload: CreateReviewDto) {
    const user = await User.findOne({ where: { user_id } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const review = await this.reviewModel.create({
      movie_id,
      user_id,
      rating: payload.rating,
      comment: payload.comment,
    });

    return {
      success: true,
      message: "Sharh muvaffaqiyatli qo'shildi",
      data: {
        id: review.review_id,
        user: {
          id: user.dataValues.user_id,
          username: user.username,
        },
        movie_id,
        rating: payload.rating,
        comment: payload.comment,
        created_at: review.createdAt,
      },
    };
  }

  async remove(movie_id: string, review_id: string, user_id: string) {
    const review = await this.reviewModel.findOne({
      where: { review_id, movie_id, user_id },
    });

    if (!review)
      throw new NotFoundException('Sharh topilmadi yoki sizga tegishli emas');

    await review.destroy();

    return {
      success: true,
      message: "Sharh muvaffaqiyatli o'chirildi",
    };
  }

  async getReviewsByMovie(movie_id: string) {
    const reviews = await this.reviewModel.findAll({
      where: { movie_id },
      include: [{ model: User, attributes: ['user_id', 'username'] }],
      order: [['createdAt', 'DESC']],
    });

    return {
      success: true,
      count: reviews.length,
      data: reviews.map((review) => ({
        review_id: review.review_id,
        user: {
          user_id: review.user?.user_id,
          username: review.user?.username,
        },
        rating: review.rating,
        comment: review.comment,
        created_at: review.createdAt,
      })),
    };
  }
}
