import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckIn } from './checkin.entity';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { User } from '../user/user.entity';
import { Class } from '../class/class.entity';

@Injectable()
export class CheckInService {
  constructor(
    @InjectRepository(CheckIn)
    private checkInRepository: Repository<CheckIn>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createCheckInDto: CreateCheckInDto): Promise<CheckIn> {
    const { userId, classId } = createCheckInDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const classEntity = await this.classRepository.findOneBy({ id: classId });
    if (!classEntity) {
      throw new Error('Class not found');
    }

    const checkIn = new CheckIn();
    checkIn.user = user;
    checkIn.class = classEntity;

    const savedCheckIn = await this.checkInRepository.save(checkIn);
    console.log('Saved CheckIn:', savedCheckIn); // Adicione um log para depuração
    return savedCheckIn;
  }

  async findAll(): Promise<CheckIn[]> {
    return this.checkInRepository.find();
  }

  async findOne(id: number): Promise<CheckIn> {
    const checkIn = await this.checkInRepository.findOne({
      where: { id },
      relations: ['class', 'user'], // Inclua as relações aqui
    });
    if (!checkIn) {
      throw new Error('CheckIn not found');
    }
    return checkIn;
  }
}
