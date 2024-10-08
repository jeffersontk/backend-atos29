import { Module } from '@nestjs/common';
import { Schedule } from './schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { UserModule } from '../user/user.module';
import { MinistryModule } from '../ministry/ministry.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), UserModule, MinistryModule],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
