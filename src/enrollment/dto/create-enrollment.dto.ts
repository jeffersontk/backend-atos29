import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  classId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
