import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from 'src/common/maile/maile.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { User } from 'src/core/models/user.model/user.model';
import { JWTAccessOptions } from 'src/common/config/jwt';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register(JWTAccessOptions),
    MailerModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
