import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  @Inject() private readonly adminService: AdminService;
  async validateAdmin(username: string, password: string) {
    const admin = await this.adminService.findOne({ username });
    if (!admin) throw new UnauthorizedException('用户名不存在！');
    if (!compareSync(password, admin.password))
      throw new UnauthorizedException('密码错误！');
    const { password: _, ...result } = admin;
    return result;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
