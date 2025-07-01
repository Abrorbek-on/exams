import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserSubscription } from '../user-subscription.model/user-subscription.model';
import { PaymentMethod, PaymentStatus } from 'src/core/types/types';

@Table({ tableName: 'payments' })
export class Payment extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  payment_id: string;

  @ForeignKey(() => UserSubscription)
  @Column({ type: DataType.UUID, allowNull: false })
  user_subscription_id: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentMethod)),
    allowNull: false,
  })
  payment_method: PaymentMethod;

  @Column({ type: DataType.JSON, allowNull: true })
  payment_details: object;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
    allowNull: true,
    defaultValue: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ type: DataType.STRING, allowNull: true })
  external_transaction_id: string;

  @BelongsTo(() => UserSubscription)
  user_subscription: UserSubscription;
}
