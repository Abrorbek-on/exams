import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeedersService } from './sider.service';
import { User } from '../models/user.model/user.model';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [SeedersService],
  exports: [SeedersService]
})

export class SeedersModule {}
