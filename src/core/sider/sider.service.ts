import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.model/user.model';

@Injectable()
export class SeedersService implements OnModuleInit {
  private readonly logger = new Logger('SeedersService');

  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async onModuleInit() {
    await this.userSeeder();
  }

  async userSeeder() {
    const username = 'AbrorBey';
    const email = 'abrorjonk9@gmail.com';
    const password = 'Abrorbek009';

    const existingUser = await this.userModel.findOne({ where: { username } });

    if (existingUser) {
      this.logger.warn(`❗ User '${username}' already exists. Seeder skipped.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      username,
      email,
      password_hash: hashedPassword,
      role: 'SUPERADMIN',
    });
    

    this.logger.log('✅ Superadmin successfully created!');
  }
}
