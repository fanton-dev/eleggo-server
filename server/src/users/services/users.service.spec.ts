import * as bcrypt from 'bcrypt';

import { IUser, User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: IUser = {
    id: uuid(),
    password: 'correct_password',
    username: 'gosho',
    email: 'gosho@test.eleggo.app',
    googleId: '133773578008135',
    discordId: '8008135420889696',
    githubId: '42080085',
  };

  const hashedPassword = bcrypt.hashSync(mockUser.password, 10);

  const mockUsersRepository = {
    findOne: jest.fn().mockImplementation(() =>
      Promise.resolve({
        ...mockUser,
        password: hashedPassword,
      }),
    ),
    save: jest
      .fn()
      .mockImplementation((entity: IUser) =>
        Promise.resolve({ id: uuid(), ...entity }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findById should search for a user by id and return it', async () => {
    expect(await service.findByUsername(mockUser.username)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('findByUsername should search for a user by username and return it', async () => {
    expect(await service.findByUsername(mockUser.username)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('findByEmail should search for a user by email and return it', async () => {
    expect(await service.findByEmail(mockUser.email)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('findByGoogleId should search for a user by a google id and return it', async () => {
    expect(await service.findByGoogleId(mockUser.googleId)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('findByDiscordId should search for a user by a discord id and return it', async () => {
    expect(await service.findByDiscordId(mockUser.discordId)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('findByGithubId should search for a user by github id and return it', async () => {
    expect(await service.findByGithubId(mockUser.githubId)).toEqual({
      ...mockUser,
      password: hashedPassword,
    });
  });

  it('createUser should create a new user, hash the password and return it', async () => {
    const user = await service.createUser({
      username: mockUser.username,
      password: mockUser.password,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.username).toEqual(mockUser.username);
    expect(user.password).toEqual(expect.any(String));
    expect(user.password).not.toBe(mockUser.password);

    expect(mockUsersRepository.save).toBeCalledTimes(1);
  });

  it('verifyPassword should return false on wrong password', async () => {
    const wrongPassword = 'wrong_password';

    expect(
      await service.verifyPassword(mockUser.username, wrongPassword),
    ).toEqual(false);
  });

  it('verifyPassword should return true on correct password', async () => {
    expect(
      await service.verifyPassword(mockUser.username, mockUser.password),
    ).toEqual(true);
  });
});
