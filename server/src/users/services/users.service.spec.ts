import { IUser, User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: IUser = {
    id: uuid(),
    username: 'gosho',
    email: 'gosho@test.eleggo.app',
    googleId: '133773578008135',
    discordId: '8008135420889696',
    githubId: '42080085',
  };

  const mockUsersRepository = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve(mockUser)),
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

  it('findByUsername should search for a user by username and return it', async () => {
    expect(await service.findByUsername(mockUser.username)).toEqual(mockUser);
  });

  it('findByEmail should search for a user by email and return it', async () => {
    expect(await service.findByEmail(mockUser.email)).toEqual(mockUser);
  });

  it('findByGoogleId should search for a user by a google id and return it', async () => {
    expect(await service.findByGoogleId(mockUser.googleId)).toEqual(mockUser);
  });

  it('findByDiscordId should search for a user by a discord id and return it', async () => {
    expect(await service.findByDiscordId(mockUser.discordId)).toEqual(mockUser);
  });

  it('findByGithubId should search for a user by github id and return it', async () => {
    expect(await service.findByGithubId(mockUser.githubId)).toEqual(mockUser);
  });

  it('createUser should create new users and return it', async () => {
    expect(await service.createUser({ username: 'gosho' })).toEqual({
      id: expect.any(String),
      username: 'gosho',
    });
    expect(mockUsersRepository.save).toBeCalledTimes(1);
  });
});
