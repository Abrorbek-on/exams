import {
  Body, Controller, Post, Get, Put, Delete,
  Param, Query, UploadedFile, UseInterceptors,
  UseGuards, BadRequestException, Req
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/core/decarator/roles.decarator';
import { UserRole, SubscriptionType } from 'src/core/types/types';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: MovieDto })
  @UseInterceptors(FileInterceptor('poster', {
    storage: diskStorage({
      destination: './uploads/posters',
      filename: (req, file, cb) => {
        cb(null, uuidv4() + extname(file.originalname));
      }
    }),
    fileFilter: (req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowed.includes(file.mimetype)) {
        return cb(
          new BadRequestException("Faqat .jpg, .jpeg, .png fayllar ruxsat etiladi!"),
          false
        );
      }
      cb(null, true);
    }
  }))
  async createMovie(
    @Req() req: Request,
    @UploadedFile() poster: Express.Multer.File,
    @Body() payload: MovieDto
  ) {
    if (!poster) throw new BadRequestException('Poster fayli kerak!');
    return this.movieService.createMovie(req['user'].id, payload, poster.filename);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Qidiruv matni' })
  @ApiQuery({ name: 'category', required: false, type: String, description: 'Kategoriya ID' })
  @ApiQuery({
    name: 'subscription_type',
    required: false,
    enum: SubscriptionType,
    description: 'Obuna turi: free yoki premium',
  })
  async getMovies(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('subscription_type') subscription_type?: SubscriptionType
  ) {
    return this.movieService.getMovies(+page, +limit, search, category, subscription_type);
  }

  @Get(':slug')
  async getMovieBySlug(@Param('slug') slug: string) {
    return this.movieService.getMovieBySlug(slug);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async updateMovie(
    @Param('id') id: string,
    @Body() payload: MovieDto
  ) {
    return this.movieService.updateMovie(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }
}
