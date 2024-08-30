import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinistryEnrollmentService } from './ministry-enrollment.service';
import { MinistryEnrollmentController } from './ministry-enrollment.controller';
import { MinistryEnrollment } from './ministry-enrollment.entity';
import { User } from '../user/user.entity';
import { Ministry } from '../ministry/ministry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinistryEnrollment, User, Ministry])],
  controllers: [MinistryEnrollmentController],
  providers: [MinistryEnrollmentService],
})
export class MinistryEnrollmentModule {}
