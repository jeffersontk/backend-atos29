import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMinistryEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  ministryId: number;
}
