import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { SubscriptionType } from "src/core/types/types"; // to‘g‘ri import yo‘lini tekshiring

export class MovieDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  release_year: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  duration_minutes: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  rating: string;

  @ApiProperty({
    enum: Object.values(SubscriptionType),
    default: SubscriptionType.FREE,
    required: false,
    description: 'Obuna turi: free yoki premium',
  })
  @IsOptional()
  @IsEnum(SubscriptionType, {
    message: 'subscription_type faqat "free" yoki "premium" bolishi kerak',
  })
  subscription_type: SubscriptionType = SubscriptionType.FREE;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  category_id: string;  

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
    description: 'Poster fayli (.jpg, .jpeg, .png)',
  })
  @IsOptional()
  poster: any;
}
