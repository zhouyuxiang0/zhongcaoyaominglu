import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from 'src/admin/admin.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [forwardRef(() => AdminModule)],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
