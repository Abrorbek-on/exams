import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty()
  @IsUUID()
  movie_id: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsUUID()
  // user_id: string;
}
