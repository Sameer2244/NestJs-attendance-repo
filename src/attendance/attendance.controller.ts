import { Body, Controller, Get, Post } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDTO } from './dto/attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
  @Get()
  findAll(): object {
    return this.attendanceService.getAllAttedanceRecord();
  }

  @Post()
  create(@Body() attendance: CreateAttendanceDTO) {
    // userData contains the JSON sent from the frontend
    this.attendanceService.create(attendance);
    return `Creating a user with name: ${attendance.name}`;
  }
}
