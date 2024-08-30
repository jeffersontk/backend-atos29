import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckInService } from './checkin.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';
import { CheckIn } from './checkin.entity';
import { CheckInResponseDto } from './dto/checkin-response.dto';

@Controller('checkins')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  async create(@Body() createCheckInDto: CreateCheckInDto): Promise<CheckIn> {
    return this.checkInService.create(createCheckInDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CheckInResponseDto> {
    const checkIn = await this.checkInService.findOne(id);
    return {
      id: checkIn.id,
      createdAt: checkIn.createdAt,
      class: checkIn.class,
      user: checkIn.user,
    };
  }

  @Get()
  async findAll() {
    return this.checkInService.findAll();
  }
}
