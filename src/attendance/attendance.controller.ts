import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AttendanceService } from './attendance.service';
import { SignInDTO } from './dto/signin.dto';
import { SignOutDTO } from './dto/signout.dto';
import { ApiBody } from '@nestjs/swagger';

//modify the attendance based on utility
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
  @UseGuards(AuthGuard)
  @Post('clock-in')
  @ApiBody({
    schema: {
      example: {
        employeeId: '6923dde0366752d27d4916d1',
        clockInTime: '10am',
        clockInComment: 'sign in',
        date: '24-11-2025',
      },
    },
  })
  clockIn(@Body() attendanceDto: SignInDTO) {
    return this.attendanceService.clockIn(attendanceDto);
  }

  @UseGuards(AuthGuard)
  @Post('clock-out')
  @ApiBody({
    schema: {
      example: {
        employeeId: '6923dde0366752d27d4916d1',
        clockOutTime: '10pm',
        clockOutComment: 'sign out',
        date: '24-11-2025',
      },
    },
  })
  clockOut(@Body() attendanceDto: SignOutDTO) {
    return this.attendanceService.clockOut(attendanceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAttendanceData(@Query('date') date: string) {
    return this.attendanceService.getAttendanceData(date);
  }
}
