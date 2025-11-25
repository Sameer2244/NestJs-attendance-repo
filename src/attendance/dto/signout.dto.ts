import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignOutDTO {
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsString()
  @IsOptional()
  clockOutTime: string;

  @IsString()
  @IsOptional()
  clockOutComment: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
