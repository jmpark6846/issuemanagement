import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateIssueDto, CreateProjectDto } from './issue.dto';
import { Issue, Project } from './issue.entity';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,
  ) {}

  async findAll() {
    return await this.issueRepository.find();
  }

  async create(createIssueDto: CreateIssueDto) {
    const issue = new Issue();
    issue.title = createIssueDto.title;
    issue.body = createIssueDto.body;
    issue.assignee = createIssueDto.assignee;
    issue.project = createIssueDto.project;
    console.log(createIssueDto);
    const saved = await this.issueRepository.save(issue);

    return saved;
  }
}

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userServce: UserService,
  ) {}

  async findAll() {
    return await this.projectRepository.find();
  }

  async create(user: User, createProjectDto: CreateProjectDto) {
    const project = new Project();
    project.title = createProjectDto.title;
    project.user = user;

    const saved = await this.projectRepository.save(project);
    return saved;
  }
}
