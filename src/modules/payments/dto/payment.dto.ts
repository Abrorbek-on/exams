import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  user_subscription_id: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: ['card', 'paypal', 'bank_transfer', 'crypto'] })
  @IsEnum(['card', 'paypal', 'bank_transfer', 'crypto'])
  payment_method: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  payment_details: object;

  @ApiProperty({ enum: ['pending', 'completed', 'failed', 'refunded'] })
  @IsEnum(['pending', 'completed', 'failed', 'refunded'])
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  external_transaction_id: string;
}
