import { Exclude } from 'class-transformer';
import { BaseModel } from 'src/app.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  picUrl: string;
}

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => UserProfile)
  profile: UserProfile;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
