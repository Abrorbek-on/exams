import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlan } from 'src/core/models/subscription-plan.model/subscription-plan.model';
import { CreateSubscriptionPlanDto } from './dto/subscription-plan.dto';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectModel(SubscriptionPlan)
    private readonly planRepo: typeof SubscriptionPlan,
  ) {}

  async getAll() {
    const plans = await this.planRepo.findAll({ where: { is_active: true } });
    return { success: true, data: plans };
  }

  async create(dto: Required<CreateSubscriptionPlanDto>) {
    const plan = await this.planRepo.create(dto);
    return { success: true, message: 'Obuna rejasi yaratildi', data: plan };
  }

  async update(id: string, dto: CreateSubscriptionPlanDto) {
    const plan = await this.planRepo.findByPk(id);
    if (!plan) throw new NotFoundException('Obuna rejasi topilmadi');

    await plan.update(dto);
    return { success: true, message: 'Obuna rejasi yangilandi', data: plan };
  }

  async remove(id: string) {
    const plan = await this.planRepo.findByPk(id);
    if (!plan) throw new NotFoundException('Obuna rejasi topilmadi');

    await plan.destroy();
    return { success: true, message: 'Obuna rejasi ochirildi' };
  }
}
