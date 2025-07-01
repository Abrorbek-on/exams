import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Matches, IsJWT } from "class-validator";

export class refreshtokenDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsJWT()
    token: string
}