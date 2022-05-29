import { CacheModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { Image } from './entities/image.entity';
import { Passage } from './entities/passage.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'zhongcaoyaominglu',
      autoLoadEntities: true,
      synchronize: true,
      cache: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.register(),
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([Image, Passage]),
  ],
  providers: [CommonService],
  exports: [JwtModule],
})
export class CommonModule {}
