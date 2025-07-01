import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  async onModuleInit() {
    this.client = new Redis("rediss://default:AUjuAAIjcDE2OTVkMTg2M2Q0MDA0NjE4ODdjOTg1MmVhNGJkZTg1ZnAxMA@viable-bobcat-18670.upstash.io:6379");
  }

  async set(key: string, value: string, seconds: number) {
    await this.client.set(key, value, 'EX', seconds);
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
