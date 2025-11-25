import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttendanceDocument = HydratedDocument<Attendance>;

@Schema({ collection: 'attendance', timestamps: true })
export class Attendance {
  @Prop({ required: true })
  employeeId: string;

  @Prop()
  clockInTime: string;

  @Prop()
  clockInComment: string;

  @Prop()
  clockOutTime: string;

  @Prop()
  clockOutComment: string;

  @Prop({ unique: true })
  date: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
