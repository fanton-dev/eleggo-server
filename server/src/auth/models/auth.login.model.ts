import { IsString, MaxLength, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginModel {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  @ApiProperty({ type: String })
  username: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  @ApiProperty({ type: String })
  password: string;
}
