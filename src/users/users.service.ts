import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
  ) {}

  findOne(id: string): Promise<Users | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateUserDto: CreateUserDto) {
    const newUser = new this.userModel(updateUserDto);
    return newUser.updateOne({ _id: id });
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
