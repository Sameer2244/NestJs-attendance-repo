/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name)
    private readonly userModel: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      //date in dd/mm/yyyy
      const userInfo = await this.userModel
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        .findOne({ email: payload?.email })
        .exec();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request['user'] = userInfo;
    } catch {
      console.log(new Date().toLocaleDateString());
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
