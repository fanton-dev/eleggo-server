import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId: string;

  @Column({ name: 'discord_id', nullable: true, unique: true })
  discordId: string;

  @Column({ name: 'github_id', nullable: true, unique: true })
  githubId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;
}

export interface IUser {
  id?: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  googleId?: string;
  discordId?: string;
  githubId?: string;
  name?: string;
  avatar?: string;
}
