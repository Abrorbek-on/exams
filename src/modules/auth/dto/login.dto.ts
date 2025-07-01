import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";

export class loginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string

    @ApiProperty()
    @Matches(/^[a-zA-Z0-9]{6,20}$/)
    password:string
}