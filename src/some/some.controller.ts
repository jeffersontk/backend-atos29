// src/some/some.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';

import { Role } from '../auth/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('some')
export class SomeController {
  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  getAdminData() {
    return { message: 'This is admin data' };
  }
}
