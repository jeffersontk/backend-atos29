import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEbdDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  classId: string;
}
