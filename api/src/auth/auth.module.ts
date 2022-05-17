import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => AdminModule)],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
