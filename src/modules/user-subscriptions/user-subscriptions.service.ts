import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSubscription } from 'src/core/models/user-subscription.model/user-subscription.model';
import { SubscriptionPlan } from 'src/core/models/subscription-plan.model/subscription-plan.model';
import { Payment } from 'src/core/models/payment.model/payment.model';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionUserCreateDto } from './dto/user-subscription.dto';

@Injectable()
export class UserSubscriptionsService {
  constructor(
    @InjectModel(UserSubscription)
    private userSubModel: typeof UserSubscription,
    @InjectModel(SubscriptionPlan)
    private subPlanModel: typeof SubscriptionPlan,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) { }

  async purchasePlan(user_id: string, dto: SubscriptionUserCreateDto) {
    const plan = await this.subPlanModel.findByPk(dto.plan_id);
    if (!plan) throw new NotFoundException('Bunday obuna rejasi topilmadi');

    const start_date = new Date();
    const end_date = new Date(start_date.getTime());
    end_date.setDate(end_date.getDate() + plan.duration_days);

    const subscription = await this.userSubModel.create({
      user_id,
      plan_id: dto.plan_id,
      start_date,
      end_date,
      status: 'active',
      auto_renew: dto.auto_renew,
    });

    const payment = await this.paymentModel.create({
      payment_id: uuidv4(),
      user_subscription_id: subscription.usersubscriptions_id,
      amount: plan.price,
      payment_method: dto.payment_method,
      status: 'completed',
      external_transaction_id: 'txn_' + Math.floor(Math.random() * 9999999),
    });

    return {
      success: true,
      message: 'Obuna muvaffaqiyatli sotib olindi',
      data: {
        subscription,
        payment,
      },
    };
  }

  async getUserSubscriptions(user_id: string) {
    const subscriptions = await this.userSubModel.findAll({
      where: { user_id },
      include: [SubscriptionPlan],
    });

    return {
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    };
  }
  async updateSubscription(user_id: string, id: string, dto: SubscriptionUserCreateDto) {
    const subscription = await this.userSubModel.findOne({
      where: { usersubscriptions_id: id, user_id },
    });
    if (!subscription) throw new NotFoundException('Obuna topilmadi');

    const plan = await this.subPlanModel.findByPk(dto.plan_id);
    if (!plan) throw new NotFoundException('Yangi obuna rejasi mavjud emas');

    const start_date = new Date();
    const end_date = new Date(start_date.getTime());
    end_date.setDate(end_date.getDate() + plan.duration_days);

    await subscription.update({
      plan_id: dto.plan_id,
      start_date,
      end_date,
      auto_renew: dto.auto_renew,
      status: 'active',
    });

    return {
      success: true,
      message: 'Obuna yangilandi',
      data: subscription,
    };
  }

  async removeSubscription(user_id: string, id: string) {
    const subscription = await this.userSubModel.findOne({
      where: { usersubscriptions_id: id, user_id },
    });
    if (!subscription) throw new NotFoundException('Obuna topilmadi');

    await subscription.destroy();

    return {
      success: true,
      message: 'Obuna ochirildi',
    };
  }
}
