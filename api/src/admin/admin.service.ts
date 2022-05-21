import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LogedAdmin } from 'src/common/types';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  @Inject() private readonly jwtService: JwtService;
  login(authAdmin: LogedAdmin) {
    return {
      statusCode: HttpStatus.OK,
      data: { token: this.jwtService.sign(authAdmin) },
    };
  }
  @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>;
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findOne(where: FindOptionsWhere<Admin> | FindOptionsWhere<Admin>[]) {
    return await this.adminRepo.findOneBy(where);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
