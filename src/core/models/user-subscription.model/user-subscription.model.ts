import {
  Table, Column, Model, DataType,
  Default, ForeignKey, BelongsTo, HasMany
} from 'sequelize-typescript';
import { User } from '../user.model/user.model';
import { SubscriptionPlan } from '../subscription-plan.model/subscription-plan.model';
import { Payment } from '../payment.model/payment.model';
import { subscriptionStatus } from 'src/core/types/types';

@Table({ tableName: 'user_subscriptions' })
export class UserSubscription extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  usersubscriptions_id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @ForeignKey(() => SubscriptionPlan)
  @Column({ type: DataType.UUID, allowNull: false })
  plan_id: string;

  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  end_date: Date;

  @Column({ type: DataType.ENUM(...Object.values(subscriptionStatus)), allowNull: false })
  status: subscriptionStatus;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  auto_renew: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => SubscriptionPlan)
  plan: SubscriptionPlan;

  @HasMany(() => Payment)
  payments: Payment[];
}
