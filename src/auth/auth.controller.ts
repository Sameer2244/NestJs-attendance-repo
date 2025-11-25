import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({
    schema: {
      example: {
        email: 'test@gmail.com',
        password: '123456',
      },
    },
  })
  signIn(@Body() signInDto: CreateAuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiBody({
    schema: {
      example: {
        email: 'test@gmail.com',
        password: '123456',
      },
    },
  })
  signUp(@Body() signUpDto: CreateAuthDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req?.user;
  }
}
