import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Tasks>;

@Schema({ collection: 'tasks', timestamps: true })
export class Tasks {
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  startTime: string;

  @Prop({ required: true })
  endTime: string;

  @Prop()
  date: Date;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
