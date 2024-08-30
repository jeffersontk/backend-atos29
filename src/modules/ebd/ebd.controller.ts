// src/ebd/ebd.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EbdService } from './ebd.service';
import { CreateEbdDto } from './dto/create-ebd.dto';

@ApiTags('ebd')
@Controller('ebd')
export class EbdController {
  constructor(private readonly ebdService: EbdService) {}

  @Post()
  async createEbd(@Body() createEbdDto: CreateEbdDto) {
    return this.ebdService.createEbd(createEbdDto);
  }

  @Get(':ebdId')
  async getEbdHistory(@Param('ebdId') ebdId: number) {
    return this.ebdService.getEbdHistory(ebdId);
  }
}
