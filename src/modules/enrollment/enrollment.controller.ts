import { Controller, Post, Get, Body, Param, Delete } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Enrollment } from './enrollment.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  create(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<Enrollment> {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  findAll(): Promise<Enrollment[]> {
    return this.enrollmentService.findAll();
  }

  @Get('class/:classId')
  findByClassId(@Param('classId') classId: number): Promise<Enrollment[]> {
    return this.enrollmentService.findByClassId(classId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.enrollmentService.remove(id);
  }
}
