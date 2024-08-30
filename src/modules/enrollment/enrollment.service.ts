import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Class } from '../class/class.entity';
import { User } from '../user/user.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const { classId, userId } = createEnrollmentDto;

    const classEntity = await this.classRepository.findOneBy({ id: classId });
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!classEntity || !user) {
      throw new Error('Class or User not found');
    }

    const enrollment = this.enrollmentRepository.create({
      class: classEntity,
      user,
    });

    return this.enrollmentRepository.save(enrollment);
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({ relations: ['class', 'user'] });
  }

  async findByClassId(classId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { class: { id: classId } },
      relations: ['user'],
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.enrollmentRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Enrollment not found');
    }
  }
}
