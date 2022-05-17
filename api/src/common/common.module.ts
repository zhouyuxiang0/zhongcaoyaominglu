import { CacheModule, Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from './common.service';
import { JwtModule } from '@nestjs/jwt';
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
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: process.env.NODE_ENV == 'production' ? false : true,
      autoSchemaFile: true,
      routes: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.register(),
    JwtModule.register({
      secret: '',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [CommonService],
  exports: [JwtModule],
})
export class CommonModule {}
