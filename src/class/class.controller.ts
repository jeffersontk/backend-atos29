import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { Class } from './class.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classService.create(createClassDto);
  }

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Class> {
    const classEntity = await this.classService.findOne(id);
    return classEntity;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateClassDto: CreateClassDto,
  ): Promise<Class> {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.classService.remove(id);
  }
}
