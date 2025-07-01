import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchHistory } from 'src/core/models/watch-history.model/watch-history.model';
import { CreateWatchHistoryDto, UpdateWatchHistoryDto } from './dto/watch-history.dto';

@Injectable()
export class WatchHistoryService {
  constructor(
    @InjectModel(WatchHistory)
    private watchHistoryModel: typeof WatchHistory,
  ) {}

  async create(payload: CreateWatchHistoryDto) {
    const createdWatch = await this.watchHistoryModel.create(payload as any);
    return createdWatch;
  }

  async findOne(id: string) {
    const watchHistory = await this.watchHistoryModel.findByPk(id);
    if (!watchHistory) throw new NotFoundException('Watch history not found');
    return watchHistory;
  }

  async findAllByUser(user_id: string){
    return await this.watchHistoryModel.findAll({ where: { user_id } });
  }

  async update(id: string, dto: UpdateWatchHistoryDto){
    const watchHistory = await this.findOne(id);
    return await watchHistory.update({ ...dto });
  }

  async remove(id: string) {
    const watchHistory = await this.findOne(id);
    await watchHistory.destroy();
  }
}
