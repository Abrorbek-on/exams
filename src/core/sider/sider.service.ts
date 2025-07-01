import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model/user.model';

@Injectable()
export class SeedersService implements OnModuleInit {
  private readonly logger = new Logger("weryil");

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async onModuleInit() {
    await this.userSeeder();
  }

  async userSeeder() {
    
    const username =  "AbrorBey"
    const email = "abrorjonk9@gmail.com"
    const password = "Abrorbek009"

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: 'SUPERADMIN', 
      
    });

    this.logger.log('✅ Superadmin successfully created!');
  }
}
