// src/check-in/check-in.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Class } from '../class/class.entity';
import { User } from '../user/user.entity';
import { CheckIn } from './checkin.entity';
import { CheckInService } from './checkin.service';
import { CheckInController } from './checkin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Class, User])],
  providers: [CheckInService],
  controllers: [CheckInController],
})
export class CheckInModule {}
