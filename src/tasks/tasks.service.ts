import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDTO } from './dto/createtask.dto';
import { Tasks } from './task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name)
    private readonly taskModel: Model<Tasks>,
  ) {}

  getTasks(date: string) {
    return this.taskModel.find({ date }).exec();
  }

  createTask(taskDto: CreateTaskDTO) {
    if (taskDto.startTime.split(':')[0] > taskDto.endTime.split(':')[0]) {
      return {
        status: 400,
        message: 'Start time cannot be greater than end time.',
      };
    }
    const newTask = new this.taskModel(taskDto);
    newTask.save();
    return { status: 200, message: 'Successfully created task.' };
  }
}
