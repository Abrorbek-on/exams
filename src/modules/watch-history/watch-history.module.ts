import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch-history.model/watch-history.model';
import { WatchHistoryController } from './watch-history.controller';
import { WatchHistoryService } from './watch-history.service';

@Module({
  imports: [SequelizeModule.forFeature([WatchHistory])],
  controllers: [WatchHistoryController],
  providers: [WatchHistoryService],
})
export class WatchHistoryModule {}
