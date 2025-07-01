import {
  Controller,
  Post,
  Delete,
  Param,
  Req,
  Body,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { UserRole } from 'src/core/types/types';
import { Roles } from 'src/core/decarator/roles.decarator';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('create/:movie_id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.USER)
  create(
    @Param('movie_id') movie_id: string,
    @Req() req: Request,
    @Body() body: CreateReviewDto,
  ) {
    return this.reviewsService.create(movie_id, req['user'].id, body);
  }

  @Delete('delete/:review_id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.USER)
  remove(
    @Param('movie_id') movie_id: string,
    @Param('review_id') review_id: string,
    @Req() req: Request,
  ) {
    return this.reviewsService.remove(
      movie_id,
      review_id,
      req['user'].id,
    );
  }

  @Get(':movie_id')
  @UseGuards(AuthGuard)
  getReviewsByMovie(@Param('movie_id') movie_id: string) {
    return this.reviewsService.getReviewsByMovie(movie_id);
  }
}
