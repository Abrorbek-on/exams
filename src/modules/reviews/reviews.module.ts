import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from 'src/core/models/review.model/review.model';
import { User } from 'src/core/models/user.model/user.model';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';

@Module({
  imports: [SequelizeModule.forFeature([Review, User])],
  controllers: [ReviewsController],
  providers: [ReviewsService, AuthGuard],
})
export class ReviewsModule {}
