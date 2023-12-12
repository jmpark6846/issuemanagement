import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User, UserProfile } from './user/user.entity';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { Comment, Issue, Label, Project } from './issue/issue.entity';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV !== 'dev' && NODE_ENV !== 'prod') {
  throw new Error('NODE_ENV not set');
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserProfile, User, Issue, Project, Comment, Label],
      synchronize: true, //NODE_ENV === 'dev', // always 'false' on production
    }),

    AuthModule,
    UserModule,
    IssueModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
