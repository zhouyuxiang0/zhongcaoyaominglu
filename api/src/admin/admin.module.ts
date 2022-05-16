import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminResolver, AdminService],
})
export class AdminModule implements OnModuleInit {
  onModuleInit() {
    const username = '18395433055';
    const password = '929957640';
    const adminRepo = getRepository(Admin);
    adminRepo
      .findOne({
        where: {
          username,
        },
      })
      .then((admin) => {
        if (admin) return;
        const newAdmin = new Admin();
        newAdmin.username = username;
        newAdmin.salt = bcrypt.genSaltSync();
        newAdmin.password = bcrypt.hashSync(password, newAdmin.salt);
        newAdmin.save().then((v) => {
          console.log(v);
        });
      });
  }
}
