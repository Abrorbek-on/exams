import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SubscriptionUserCreateDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002' })
  @IsNotEmpty()
  @IsString()
  plan_id: string;

  @ApiProperty({ example: 'card' })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  auto_renew: boolean;

  @ApiProperty({
    example: {
      card_number: '4242XXXXXXXX4242',
      expiry: '04/26',
      card_holder: 'ALIJON VALIYEV',
    },
  })
  @IsObject()
  payment_details: {
    card_number: string;
    expiry: string;
    card_holder: string;
  };
}
