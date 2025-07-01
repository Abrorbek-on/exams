import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user-subscription.model/user-subscription.model';
import { Payment } from 'src/core/models/payment.model/payment.model';
import { UserSubscriptionsController } from './user-subscriptions.controller';
import { UserSubscriptionsService } from './user-subscriptions.service';
import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([UserSubscription, Payment]),
    SubscriptionPlansModule,
    JwtModule,
  ],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
})
export class UserSubscriptionsModule {}
