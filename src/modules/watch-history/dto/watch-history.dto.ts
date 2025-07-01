import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsInt,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateWatchHistoryDto {
  @ApiProperty({
    example: '2b97e2b1-dc84-4de4-8e31-123456789abc',
    description: "Foydalanuvchi ID (UUID formatda)",
  })
  @IsUUID()
  user_id: string;

  @ApiProperty({
    example: '8e95b0c9-d3e2-4a8b-810f-654321fedcba',
    description: "Film ID (UUID formatda)",
  })
  @IsUUID()
  movie_id: string;

  @ApiProperty({
    example: 1200,
    description: "Tomosha qilingan davomiylik (soniyalarda)",
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  watched_duration: number;

  @ApiProperty({
    example: 75.5,
    description: "Tomosha qilingan foiz (0 dan 100 gacha)",
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  watched_percentage: number;
}

export class UpdateWatchHistoryDto {
  @ApiPropertyOptional({
    example: 1300,
    description: "Yangi tomosha qilingan davomiylik (soniyalarda)",
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  watched_duration?: number;

  @ApiPropertyOptional({
    example: 80,
    description: "Yangi tomosha qilingan foiz (0 dan 100 gacha)",
    minimum: 0,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  watched_percentage?: number;
}
