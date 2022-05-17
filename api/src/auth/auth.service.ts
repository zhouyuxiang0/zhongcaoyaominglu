import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOne({ username });
    if (!admin) return null;
    if (!bcrypt.compareSync(pass, admin.password)) return null;
    const { password, ...result } = admin;
    return result;
  }

  async login(admin: Admin) {
    const payload = { username: admin.username, sub: admin.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
