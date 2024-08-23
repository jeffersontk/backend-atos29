import { IsString, IsOptional } from 'class-validator';

export class CreateMinistryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
