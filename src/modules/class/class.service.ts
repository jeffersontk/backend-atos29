import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const newClass = this.classRepository.create(createClassDto);
    return this.classRepository.save(newClass);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['enrollments', 'enrollments.user'],
    });
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findOne({
      where: { id },
      relations: ['enrollments', 'enrollments.user'],
    });

    if (!classEntity) {
      throw new Error('Class not found');
    }

    return classEntity;
  }

  async update(id: number, updateClassDto: CreateClassDto): Promise<Class> {
    await this.classRepository.update(id, updateClassDto);
    return this.classRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
