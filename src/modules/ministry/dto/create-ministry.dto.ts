import { IsString } from 'class-validator';

export class CreateMinistryDto {
  @IsString()
  name: string;
}
