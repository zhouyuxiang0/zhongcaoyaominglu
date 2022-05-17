import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthModule } from 'src/auth/auth.module';
import { getRepository } from 'typeorm';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), forwardRef(() => AuthModule)],
  providers: [AdminResolver, AdminService],
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
        if (admin) return;
        const newAdmin = new Admin();
        newAdmin.username = username;
        newAdmin.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
        newAdmin.save().then((v) => {
          console.log(v);
        });
      });
  }
}
