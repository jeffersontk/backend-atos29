import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckInDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  classId: number;
}
