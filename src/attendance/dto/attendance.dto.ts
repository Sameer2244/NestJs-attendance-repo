import { IsString, IsInt, IsEmail, Min, IsNotEmpty } from 'class-validator';

export class CreateAttendanceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(18)
  age: number;
}
