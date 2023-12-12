import { BaseModel } from 'src/app.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum IssueStatus {
  closed,
  open,
}

enum IssuePriority {
  none,
  low,
  middle,
  high,
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];
}

@Entity()
export class Issue extends BaseModel {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: IssueStatus;

  @Column()
  priority: IssuePriority;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => User)
  assignee: User;

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;

  @ManyToMany(() => Label, (label) => label.issues)
  labels: Label[];
}

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Issue, (issue) => issue.labels)
  issues: Issue[];
}

@Entity()
export class Comment extends BaseModel {
  @ManyToOne(() => User)
  author: User;

  content: string;
}

@Entity()
export class IssueLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne(() => Issue)
  issue: Issue;

  @Column({ nullable: true })
  @ManyToOne(() => User)
  user: User;
}

@Entity()
export class FileAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ nullable: true })
  @ManyToOne(() => User)
  author: User;

  @Column({ nullable: true })
  @ManyToOne(() => Issue)
  issue: Issue;

  @Column()
  fileUrl: string;
}
