import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  avatar: any;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;
}
