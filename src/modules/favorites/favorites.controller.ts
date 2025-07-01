import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavouritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/favorite.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/core/decarator/roles.decarator';
import { UserRole } from 'src/core/types/types';
import { RolesGuard } from 'src/common/guards/role.guard';

@ApiTags('Favorites')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavouritesService) {}

  @Roles(UserRole.USER)
  @Get()
  getAll(@Req() req: Request) {
    const user_id = req['user'].id;
    return this.favoritesService.getAll(user_id);
  }

  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Sevimlilar royxatiga film qoshish' })
  @ApiConsumes('application/json')
  @ApiResponse({ status: 201, description: 'Film muvaffaqiyatli qoshildi' })
  @ApiResponse({ status: 404, description: 'Film topilmadi' })
  @Post()
  createfavorite(@Req() req: Request, @Body() payload: CreateFavoriteDto) {
    const user_id = req['user'].id;
    return this.favoritesService.createfavorite({ ...payload, user_id });
  }

  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Sevimlilar royxatidan filmni ochirish' })
  @ApiResponse({ status: 200, description: 'Film sevimlilar royxatidan ochirildi' })
  @ApiResponse({ status: 404, description: 'Film sevimlilar royxatida topilmadi' })
  @Delete(':movie_id')
  removefavorite(@Req() req: Request, @Param('movie_id') movie_id: string) {
    const user_id = req['user'].id;
    return this.favoritesService.removefavorite(user_id, movie_id);
  }
}
