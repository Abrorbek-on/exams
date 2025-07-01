import { JwtSignOptions } from '@nestjs/jwt' 
export const JWTAccessOptions: JwtSignOptions = {
    secret: "j+kdsjQS}!dj",
    expiresIn: "2000h",
}

export const JWTRefreshOptions: JwtSignOptions = {
    secret: "j+kdsjQ39hd923dhS}!dj",
    expiresIn: "29d",
}