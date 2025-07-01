import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"
import { MailerService } from 'src/common/maile/maile.service';
import { RedisService } from 'src/common/redis/redis.service';
import { User } from 'src/core/models/user.model/user.model';
import { VerificationDto } from './dto/verify.dto';
import { sendVerifyDto } from './dto/sendVerification.dto';
import { resetPasswordDto } from './dto/reset.password.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) 
        private userModel: typeof User,
        private jwtService: JwtService,
        private newMaileService: MailerService,
        private redisService: RedisService
    ) { }

    private async generateToken(payload: { userId: string; role: string }, accessTokenOnly?: boolean) {
        const accessToken = await this.jwtService.signAsync(
            { id: payload.userId, role: payload.role, type: 'access' },
            { expiresIn: '1h' }
        );

        if (accessTokenOnly) {
            return { accessToken };
        }

        const refreshToken = await this.jwtService.signAsync(
            { id: payload.userId, type: 'refresh' },
            { expiresIn: '7d' }
        );

        return {
            accessToken,
            refreshToken,
        };
    }


    async register(payload: Required<registerDto>) {
        const { username, email } = payload;

        const existingUsername = await this.userModel.findOne({ where: { username } });
        if (existingUsername) {
            throw new ConflictException('Username already exists');
        }

        // const existingEmail = await this.userModel.findOne({ where: { email } });
        // if (existingEmail) {
        //   throw new ConflictException('Email already exists');
        // }

        const code = Math.floor(100000 + Math.random() * 100000);

        await this.newMaileService.sendConfigurationMailer(payload.email, 'Tasdiqlash kodi', code);

        await this.redisService.set(`register:${payload.email}`, JSON.stringify({ ...payload, code }), 600,);

        return {
            message: `Verification code sent to ${payload.email}`
        };
    }

    async verify(payload: VerificationDto) {
        let stored = await this.redisService.get(`register:${payload.email}`);
        if (!stored) throw new BadRequestException("Otp expire or not found!");
      
        let userData = JSON.parse(stored);
        if (userData.code != payload.code) throw new BadRequestException("Otp invalide!");
      
        await this.redisService.del(`register:${payload.email}`);
      
        delete userData.code;
      
        const hash = await bcrypt.hash(userData.password, 10);
      
        const user = await this.userModel.create({
          ...userData,
          password_hash: hash,
          profile_id: uuid(),
        });
        
        return this.generateToken({ userId: user.dataValues.user_id, role: user.dataValues.role });
      }
      

    async login(payload: loginDto) {
        const { username, password } = payload;

        const user = await this.userModel.findOne({where:{username: payload.username}});
        if (!user) throw new NotFoundException('Username is invalid');

        const isMatch = await bcrypt.compare(password, user.dataValues.password_hash);
        if (!isMatch) throw new NotFoundException('Password is invalid');
        
        let token = await this.generateToken({ userId: user.dataValues.user_id, role: user.dataValues.role });
        return { token, user}
    }

    
    async refreshtoken({ token }:{ token: string }) {
        const payload = await this.jwtService.verifyAsync(token);
        return this.generateToken({ userId: payload.id, role: payload.role }, true);
    }


    async sendVerify(payload: sendVerifyDto) {
        const code = Math.floor(100000 + Math.random() * 100000);

        await this.newMaileService.sendConfigurationMailer(payload.email, 'Tasdiqlash kodi', code);

        await this.redisService.set(`pass:${payload.email}`, JSON.stringify({ ...payload, code }), 600,);

        return {
            message: `Verification code sent to ${payload.email}`
        };
    }

    async resetPassword(payload: resetPasswordDto) {
        let stored = await this.redisService.get(`pass:${payload.email}`)
        if (!stored) throw new BadRequestException("Otp expire or not found")

        let userData = JSON.parse(stored)
        if (userData.code != payload.code) throw new BadRequestException("Otp invalide!")

        await this.redisService.del(`pass:${payload.email}`)

        const hash = await bcrypt.hash(payload.password, 10);
        await this.userModel.update({password_hash:hash },{
            where:{email:payload.email}
        })
        return {
            message:"Password update succesfully"
        }
    }
}
