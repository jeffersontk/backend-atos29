import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './modules/auth/auth.module';
import { ClassModule } from './modules/class/class.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { MinistryModule } from './modules/ministry/ministry.module';
import { MinistryEnrollmentModule } from './modules/ministry/ministry-enrollment.module';
import { CheckInModule } from './modules/ebdCheckIn/checkin.module';
import { EbdModule } from './modules/ebd/ebd.module';

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
    MinistryEnrollmentModule,
    ScheduleModule,
    MinistryModule,
    EbdModule,
    CheckInModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
