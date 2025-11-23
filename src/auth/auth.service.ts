import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/users/users.schema';
import bcrypt from 'bcryptjs';
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
    if (!decryptedpassword) {
      throw new UnauthorizedException();
    }
    const payload = { email: user?.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, pass: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      message: 'User created successfully',
    };
  }
}
