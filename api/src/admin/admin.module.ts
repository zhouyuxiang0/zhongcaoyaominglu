import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthModule } from 'src/auth/auth.module';
import { getRepository } from 'typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), forwardRef(() => AuthModule)],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
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
        const newAdmin = admin || new Admin();
        newAdmin.username = username;
        newAdmin.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        newAdmin.email = '1521350289@qq.com';
        newAdmin.save().then((v) => {
          console.log(v);
        });
      });
  }
}
