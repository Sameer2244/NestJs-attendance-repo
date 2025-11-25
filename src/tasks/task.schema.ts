import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Tasks>;

@Schema({ collection: 'tasks', timestamps: true })
export class Tasks {
  @Prop()
  employeeId: string;

  @Prop()
  description: string;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop()
  date: string;

  @Prop()
  taskDescription: string;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
