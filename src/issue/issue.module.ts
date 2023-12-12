import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { IssueController, ProjectController } from './issue.controller';
import { Issue, Project } from './issue.entity';
import { IssueService, ProjectService } from './issue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, Project]), UserModule],
  controllers: [IssueController, ProjectController],
  providers: [IssueService, ProjectService],
})
export class IssueModule {}
