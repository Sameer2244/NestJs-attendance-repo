import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance } from './attendance.schema';
import { Model } from 'mongoose';
import { CreateAttendanceDTO } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name)
    private readonly attedanceModel: Model<Attendance>,
  ) {}
  // 2. READ ALL
  async getAllAttedanceRecord(): Promise<Attendance[]> {
    return this.attedanceModel.find().exec();
  }

  //create
  async create(createAttendanceDTO: CreateAttendanceDTO): Promise<Attendance> {
    const newAttendance = new this.attedanceModel(createAttendanceDTO);
    return newAttendance.save();
  }
}
