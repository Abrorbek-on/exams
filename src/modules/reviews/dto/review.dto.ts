import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: '6c6fb1ab-94aa-468b-8191-c2c806d68d1b',
    description: 'Filmning UUID formatdagi ID raqami',
  })
  @IsUUID('4', { message: 'movie_id UUID formatda bolishi kerak' })
  movie_id: string;

  @ApiProperty({
    example: 4.5,
    description: 'Filmga berilgan reyting (0 dan 5 gacha)',
  })
  @IsNumber({}, { message: 'rating number bolishi kerak' })
  @Min(0, { message: 'rating 0 dan kichik bolishi mumkin emas' })
  @Max(5, { message: 'rating 5 dan katta bolishi mumkin emas' })
  rating: number;

  @ApiProperty({ example: 'Zor film!' })
  @IsString({ message: 'comment string bolishi kerak' })
  @IsNotEmpty({ message: 'comment bosh bolmasligi kerak' })
  comment: string;
}
