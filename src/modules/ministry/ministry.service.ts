import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ministry } from './ministry.entity';
import { CreateMinistryDto } from './dto/create-ministry.dto';

@Injectable()
export class MinistryService {
  constructor(
    @InjectRepository(Ministry)
    private readonly ministryRepository: Repository<Ministry>,
  ) {}

  async create(createMinistryDto: CreateMinistryDto): Promise<Ministry> {
    const ministry = this.ministryRepository.create(createMinistryDto);
    return this.ministryRepository.save(ministry);
  }

  async findAll(): Promise<Ministry[]> {
    return this.ministryRepository.find();
  }

  async findOne(id: number): Promise<Ministry> {
    const ministry = await this.ministryRepository.findOne({ where: { id } });
    if (!ministry) {
      throw new Error('Ministry not found');
    }
    return ministry;
  }
}
