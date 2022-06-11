import { CacheModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CommonService } from './common.service';
import { Image } from './entities/image.entity';
import { Passage } from './entities/passage.entity';
@Global()
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: process.env.NODE_ENV == 'production' ? '' : 'root',
      password: process.env.NODE_ENV == 'production' ? '' : 'root',
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
  exports: [JwtModule, TypeOrmModule],
})
export class CommonModule {}
