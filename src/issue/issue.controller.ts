import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateIssueDto, CreateProjectDto } from './issue.dto';
import { IssueService, ProjectService } from './issue.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProject() {
    return await this.projectService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(
    @Request() req,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return await this.projectService.create(req.user, createProjectDto);
  }
}

@Controller('issues')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  async getIssues() {
    return await this.issueService.findAll();
  }

  @Post()
  async createIssue(@Body() createIssueDto: CreateIssueDto) {
    return await this.issueService.create(createIssueDto);
  }
}
