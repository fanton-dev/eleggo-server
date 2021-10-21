import * as bcrypt from 'bcrypt';

import { IUser, User } from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';

import { CodeSnippetsService } from 'src/code-snippets/services/code-snippets.service';
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

  const mockCodeSnippetsService = {
    createUserStorage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUsersRepository },
        { provide: CodeSnippetsService, useValue: mockCodeSnippetsService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should search for a user by id and return it', async () => {
      expect(await service.findByUsername(mockUser.username)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('findByUsername', () => {
    it('should search for a user by username and return it', async () => {
      expect(await service.findByUsername(mockUser.username)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('findByEmail', () => {
    it('should search for a user by email and return it', async () => {
      expect(await service.findByEmail(mockUser.email)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('findByGoogleId', () => {
    it('should search for a user by a google id and return it', async () => {
      expect(await service.findByGoogleId(mockUser.googleId)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('findByDiscordId', () => {
    it('should search for a user by a discord id and return it', async () => {
      expect(await service.findByDiscordId(mockUser.discordId)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('findByGithubId', () => {
    it('should search for a user by github id and return it', async () => {
      expect(await service.findByGithubId(mockUser.githubId)).toEqual({
        ...mockUser,
        password: hashedPassword,
      });
    });
  });

  describe('createUser', () => {
    it('should save a new user and return it', async () => {
      const user = await service.createUser({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(user.id).toEqual(expect.any(String));
      expect(user.username).toEqual(mockUser.username);
      expect(user.password).toEqual(expect.any(String));

      expect(mockUsersRepository.save).toBeCalledTimes(1);
    });

    it('should hash the user password', async () => {
      const user = await service.createUser({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(user.password).toEqual(expect.any(String));
      expect(user.password).not.toBe(mockUser.password);
    });

    it('should create a code snippets storage for the user', async () => {
      const user = await service.createUser({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(mockCodeSnippetsService.createUserStorage).toBeCalledTimes(1);
      expect(mockCodeSnippetsService.createUserStorage).toBeCalledWith(
        user.username,
      );
    });
  });

  describe('validatePassword', () => {
    it('should return false on wrong password', async () => {
      const wrongPassword = 'wrong_password';
      expect(
        await service.verifyPassword(mockUser.username, wrongPassword),
      ).toEqual(false);
    });

    it('should return true on correct password', async () => {
      expect(
        await service.verifyPassword(mockUser.username, mockUser.password),
      ).toEqual(true);
    });
  });
});
