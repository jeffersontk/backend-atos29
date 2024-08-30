// src/ebd/ebd.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebd } from './ebd.entity';
import { EbdController } from './ebd.controller';
import { EbdService } from './ebd.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ebd])],
  controllers: [EbdController],
  providers: [EbdService],
})
export class EbdModule {}
