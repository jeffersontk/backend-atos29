// src/ebd/ebd.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ebd } from './ebd.entity';
import { CreateEbdDto } from './dto/create-ebd.dto';

@Injectable()
export class EbdService {
  constructor(
    @InjectRepository(Ebd)
    private ebdRepository: Repository<Ebd>,
  ) {}

  async createEbd(createEbdDto: CreateEbdDto): Promise<Ebd> {
    const ebd = this.ebdRepository.create(createEbdDto);
    return this.ebdRepository.save(ebd);
  }

  async getEbdHistory(ebdId: number): Promise<Ebd> {
    return this.ebdRepository.findOne({
      where: { id: ebdId },
      relations: ['classes'],
    });
  }
}
