import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Tolov yaratish' })
  @ApiResponse({ status: 201, description: 'Tolov muvaffaqiyatli yaratildi' })
  @ApiBody({ type: CreatePaymentDto })
  create(@Body() payload: Required<CreatePaymentDto>) {
    return this.paymentsService.create(payload);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Barcha tolovlarni olish' })
  @ApiResponse({ status: 200, description: 'Tolovlar royxati qaytarildi' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Tolovni yangilash' })
  @ApiResponse({ status: 200, description: "To'lov muvaffaqiyatli yangilandi" })
  @ApiBody({ type: CreatePaymentDto })
  update(@Param('id') id: string, @Body() payload: Partial<CreatePaymentDto>) {
    return this.paymentsService.update(id, payload);
  }
}
