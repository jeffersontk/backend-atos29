import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateMinistryEnrollmentDto } from './dto/create-ministry-enrollment.dto';
import { MinistryEnrollmentService } from './ministry-enrollment.service';
import { MinistryEnrollment } from './ministry-enrollment.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ministry-enrollments')
@Controller('ministry-enrollments')
export class MinistryEnrollmentController {
  constructor(
    private readonly ministryEnrollmentService: MinistryEnrollmentService,
  ) {}

  @Post()
  async create(
    @Body() createMinistryEnrollmentDto: CreateMinistryEnrollmentDto,
  ) {
    return this.ministryEnrollmentService.create(createMinistryEnrollmentDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MinistryEnrollment> {
    return this.ministryEnrollmentService.findOne(id);
  }
}
