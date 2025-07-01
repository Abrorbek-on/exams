import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubscriptionPlanDto } from './dto/subscription-plan.dto';

@ApiTags('Subscription Plans')
@Controller('api/subscription/plans')
export class SubscriptionPlansController {
  constructor(private readonly service: SubscriptionPlansService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Barcha aktiv obuna rejalarini olish' })
  getAllPlans() {
    return this.service.getAll();
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Yangi obuna rejasi yaratish' })
  create(@Body() dto: Required<CreateSubscriptionPlanDto>) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Obuna rejasini yangilash' })
  update(@Param('id') id: string, @Body() dto: CreateSubscriptionPlanDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Obuna rejasini ochirish' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
