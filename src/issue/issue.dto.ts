import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Project } from './issue.entity';

export class CreateProjectDto {
  @IsString()
  title: string;
}

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  assignee?: User;

  @IsNumber()
  project: Project;
}
