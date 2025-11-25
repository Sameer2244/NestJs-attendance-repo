import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from './attendance.schema';
import { SignInDTO } from './dto/signin.dto';
import { SignOutDTO } from './dto/signout.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attedanceModel: Model<Attendance>,
  ) {}
  getAttendanceData(date: string) {
    return this.attedanceModel.find({ date }).exec();
  }
  async clockIn(createAttendanceDTO: SignInDTO): Promise<any> {
    const existingAttendance = await this.attedanceModel
      .findOne({
        date: createAttendanceDTO.date,
        employeeId: createAttendanceDTO.employeeId,
      })
      .exec();
    if (existingAttendance) {
      throw new ConflictException(
        'Error! You have already signed in for today.',
      );
    }
    const newAttendance = new this.attedanceModel(createAttendanceDTO);
    await newAttendance.save();
    return { status: 200, message: 'Successfully signed in for today.' };
  }

  async clockOut(createAttendanceDTO: SignOutDTO): Promise<any> {
    const existingAttendance = await this.attedanceModel
      .findOne({
        date: createAttendanceDTO.date,
        employeeId: createAttendanceDTO.employeeId,
      })
      .exec();

    if (!existingAttendance) {
      throw new ConflictException('Error! Please sign in first.');
    }
    if (existingAttendance?.clockOutTime) {
      throw new ConflictException(
        'Error! You cannot sign out twice for today.',
      );
    }
    await this.attedanceModel.updateOne(
      {
        date: createAttendanceDTO?.date,
        employeeId: createAttendanceDTO?.employeeId,
      },
      {
        clockOutTime: createAttendanceDTO?.clockOutTime,
        clockOutComment: createAttendanceDTO?.clockOutComment,
      },
    );
    return { status: 200, message: 'Successfully signed out for today.' };
  }
}
