import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsArray,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
    description: 'Rejaning UUID identifikatori (odatda avtomatik generatsiya qilinadi)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  subscriptionplans_id?: string;

  @ApiProperty({
    example: 'Premium Plan',
    description: 'Obuna rejaning nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 19.99,
    description: 'Obuna narxi (USD, som va h.k.)',
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Obuna davomiyligi (kunlarda)',
  })
  @IsInt()
  @Min(1)
  duration_days: number;

  @ApiProperty({
    example: ['HD videos', 'No ads', 'Download available'],
    description: 'Obuna rejaga tegishli imkoniyatlar royxati',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiProperty({
    example: true,
    description: 'Obuna rejasi aktivmi yoki yoq',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
