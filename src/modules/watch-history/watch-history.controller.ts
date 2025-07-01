import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { WatchHistoryService } from './watch-history.service';
import { CreateWatchHistoryDto, UpdateWatchHistoryDto } from './dto/watch-history.dto';
import { UserRole } from 'src/core/types/types';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AuthGuard } from 'src/common/guards/jwt-auth.guards.ts';
import { Roles } from 'src/core/decarator/roles.decarator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('watch-history')
@UseGuards(AuthGuard, RolesGuard)
export class WatchHistoryController {
  constructor(private readonly watchHistoryService: WatchHistoryService) {}
  @ApiBearerAuth()
  @Post()
  @Roles(UserRole.USER)
  create(@Body() dto: CreateWatchHistoryDto) {
    return this.watchHistoryService.create(dto);
  }
  @ApiBearerAuth()
  @Get('user/:user_id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAllByUser(@Param('user_id') user_id: string) {
    return this.watchHistoryService.findAllByUser(user_id);
  }
  @ApiBearerAuth()
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id') id: string) {
    return this.watchHistoryService.findOne(id);
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(UserRole.USER)
  update(@Param('id') id: string, @Body() dto: UpdateWatchHistoryDto) {
    return this.watchHistoryService.update(id, dto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @Roles(UserRole.USER)
  remove(@Param('id') id: string) {
    return this.watchHistoryService.remove(id);
  }
}
