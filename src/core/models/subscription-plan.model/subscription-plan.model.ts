import { Table, Column, Model, DataType, Default, HasMany } from 'sequelize-typescript';
import { UserSubscription } from '../user-subscription.model/user-subscription.model';

@Table({ tableName: 'subscription_plans' })
export class SubscriptionPlan extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  subscriptionplans_id!: string;

  @Column({ type: DataType.STRING })
  name!: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  price!: number;

  @Column({ type: DataType.INTEGER })
  duration_days!: number;

  @Column({ type: DataType.JSON })
  features!: object;

  @Default(true)
  @Column({ type: DataType.BOOLEAN })
  is_active!: boolean;

  @HasMany(() => UserSubscription)
  subscriptions!: UserSubscription[];
}
