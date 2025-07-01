import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { VideoQuality } from "src/core/types/types";

export class MovieFileDto {
  @ApiProperty({ enum: VideoQuality, required: false })
  @IsOptional()
  @IsEnum(VideoQuality)
  quality?: VideoQuality;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ required: true })
  @IsUUID()
  movie_id: string;

  @ApiProperty({ required: true })
  @IsString()
  file_url: string;
}
