import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { User } from '../user/user.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Ministry } from '../ministry/ministry.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Ministry)
    private readonly ministryRepository: Repository<Ministry>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { userId, ministryId, date } = createScheduleDto;

    console.log(`Looking for User with ID ${userId}`);
    console.log(`Looking for Ministry with ID ${ministryId}`);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const ministry = await this.ministryRepository.findOne({
      where: { id: ministryId },
    });

    console.log('User found:', user);
    console.log('Ministry found:', ministry);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!ministry) {
      throw new NotFoundException('Ministry not found');
    }

    const schedule = this.scheduleRepository.create({
      date,
      user,
      ministry,
    });

    return this.scheduleRepository.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find({ relations: ['user', 'ministry'] });
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['user', 'ministry'],
    });

    if (!schedule) {
      throw new Error('Schedule not found');
    }

    return schedule;
  }
}
