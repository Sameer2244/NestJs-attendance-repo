import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { MongoSharedModule } from './mongodb.shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AttendanceModule,
    TasksModule,
    // 1. Load .env file globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 2. Connect to MongoDB using the variable from ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    MongoSharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
