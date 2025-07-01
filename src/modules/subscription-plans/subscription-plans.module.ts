import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionPlan } from 'src/core/models/subscription-plan.model/subscription-plan.model';
import { SubscriptionPlansController } from './subscription-plans.controller';
import { SubscriptionPlansService } from './subscription-plans.service';
import { UserSubscription } from 'src/core/models/user-subscription.model/user-subscription.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([SubscriptionPlan, UserSubscription]),JwtModule],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService, SequelizeModule],
})
export class SubscriptionPlansModule {}
