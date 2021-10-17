import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

import { LoginModel } from './auth.login.model';

export class RegisterModel extends LoginModel {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  name: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiPropertyOptional({ type: String })
  phoneNumber: string;
}
