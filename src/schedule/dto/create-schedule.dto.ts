import { IsInt, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  userId: number;

  @IsInt()
  ministryId: number;

  @IsDateString()
  date: string;
}
