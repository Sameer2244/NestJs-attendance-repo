import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/createtask.dto';
import { Tasks } from './task.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post('/create')
  createTask(@Body() taskDto: CreateTaskDTO) {
    return this.taskService.createTask(taskDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getTasks(@Query('date') date: string): Promise<Tasks[]> {
    return this.taskService.getTasks(date);
  }
}
