import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MinistryService } from './ministry.service';
import { CreateMinistryDto } from './dto/create-ministry.dto';
import { Ministry } from './ministry.entity';

@Controller('ministries')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  @Post()
  create(@Body() createMinistryDto: CreateMinistryDto): Promise<Ministry> {
    return this.ministryService.create(createMinistryDto);
  }

  @Get()
  findAll(): Promise<Ministry[]> {
    return this.ministryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Ministry> {
    return this.ministryService.findOne(id);
  }
}
