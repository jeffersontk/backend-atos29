import { IsNotEmpty } from 'class-validator';
import { Class } from 'src/modules/class/class.entity';
import { User } from 'src/modules/user/user.entity';

export class CheckInResponseDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  class: Class;

  @IsNotEmpty()
  user: User;
}
