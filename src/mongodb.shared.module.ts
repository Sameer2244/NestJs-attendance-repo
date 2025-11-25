// mongo-shared.module.ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attendance, AttendanceSchema } from './attendance/attendance.schema';
import { Users, UserSchema } from './users/users.schema';
import { Tasks, TasksSchema } from './tasks/task.schema';

// ... add all your schemas here

@Global() // This makes it globally available!
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Attendance.name, schema: AttendanceSchema },
      { name: Tasks.name, schema: TasksSchema },
      // ... all other models
    ]),
  ],
  exports: [
    MongooseModule, // Important: export it so providers are available globally
  ],
})
export class MongoSharedModule {}
