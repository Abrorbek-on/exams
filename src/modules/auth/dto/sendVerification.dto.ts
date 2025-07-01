import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class sendVerifyDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string
}