import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/core/models/payment.model/payment.model';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentRepo: typeof Payment,
  ) {}

  async create(payload: Required<CreatePaymentDto>) {
    const payment = await this.paymentRepo.create(payload);
    return {
      success: true,
      message: "To'lov muvaffaqiyatli amalga oshirildi",
      data: payment,
    };
  }

  async findAll() {
    const payments = await this.paymentRepo.findAll();
    return {
      success: true,
      message: "Barcha to'lovlar ro'yxati",
      data: payments,
    };
  }

  async update(id: string, payload: Partial<CreatePaymentDto>) {
    const payment = await this.paymentRepo.findByPk(id);
    if (!payment) throw new NotFoundException("To'lov topilmadi");

    await payment.update(payload);
    return {
      success: true,
      message: "To'lov yangilandi",
      data: payment,
    };
  }
}
