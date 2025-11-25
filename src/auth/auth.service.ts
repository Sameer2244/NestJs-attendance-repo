import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Users } from 'src/users/users.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    const decryptedpassword = await bcrypt.compare(pass, user?.password ?? '');
    if (!decryptedpassword || !user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user?.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(email: string, pass: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    try {
      const user = await this.userModel.findOne({ email: email }).exec();
      if (user) {
        throw new ConflictException('user already exist');
      }
      await this.userModel.create({
        email: email,
        password: hashedPassword,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return {
      message: 'User created successfully',
    };
  }
}
