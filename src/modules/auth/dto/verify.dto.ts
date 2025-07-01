import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"


export class VerificationDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    code: number
}