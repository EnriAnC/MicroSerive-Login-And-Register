import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config()

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_OPTIONS, MONGO_HOST } = process.env
    return {
      uri: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_OPTIONS}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
