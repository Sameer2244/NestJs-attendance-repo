import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ collection: 'attendance', timestamps: true })
export class Attendance {
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  clockInTime: string;

  @Prop()
  clockInComment: string;

  @Prop()
  clockOutTime: string;

  @Prop()
  clockOutComment: string;

  @Prop()
  date: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
