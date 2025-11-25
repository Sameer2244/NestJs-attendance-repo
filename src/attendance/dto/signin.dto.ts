import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsOptional()
  clockInTime: string;

  @IsString()
  @IsOptional()
  clockInComment: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
