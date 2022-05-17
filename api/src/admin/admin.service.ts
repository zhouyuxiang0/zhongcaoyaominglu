import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>;
  create(createAdminInput: CreateAdminInput) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findOne(where: FindOptionsWhere<Admin> | FindOptionsWhere<Admin>[]) {
    return await this.adminRepo.findOneBy(where);
  }

  update(id: number, updateAdminInput: UpdateAdminInput) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
