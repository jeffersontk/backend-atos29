import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MinistryEnrollment } from './ministry-enrollment.entity';
import { CreateMinistryEnrollmentDto } from './dto/create-ministry-enrollment.dto';

@Injectable()
export class MinistryEnrollmentService {
  constructor(
    @InjectRepository(MinistryEnrollment)
    private readonly ministryEnrollmentRepository: Repository<MinistryEnrollment>,
  ) {}

  async create(
    createMinistryEnrollmentDto: CreateMinistryEnrollmentDto,
  ): Promise<MinistryEnrollment> {
    const ministryEnrollment = this.ministryEnrollmentRepository.create(
      createMinistryEnrollmentDto,
    );
    return this.ministryEnrollmentRepository.save(ministryEnrollment);
  }

  async findOne(id: number): Promise<MinistryEnrollment> {
    return await this.ministryEnrollmentRepository.findOne({ where: { id } });
  }
}
