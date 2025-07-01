import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { VideoQuality } from 'src/core/types/types';

export class MovieFileDto {
  @ApiProperty({
    example: 'b2c3d4e5-f6a1-8901-abcd-0987654321ef',
    description: 'Fayl tegishli film IDsi',
  })
  @IsUUID()
  movie_id: string;

  @ApiProperty({
    example: 'https://cdn.example.com/movies/movie1-720p.mp4',
    description: 'Fayl URL manzili',
  })
  @IsString()
  file_url: string;

  @ApiProperty({
    example: '720p',
    enum: VideoQuality,
    description: 'Video sifati',
  })
  @IsEnum(VideoQuality)
  quality: VideoQuality;

  @ApiProperty({
    example: 'uz',
    description: 'Video tili (uz, ru, en, ...)',
    default: 'uz',
    required: false,
  })
  @IsString()
  @IsOptional()
  language?: string;
}
