import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { MinistryModule } from './ministry/ministry.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'cbatos29',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ClassModule,
    EnrollmentModule,
    ScheduleModule,
    MinistryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
