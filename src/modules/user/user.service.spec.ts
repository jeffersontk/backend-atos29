import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

jest.setTimeout(10000);

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const userDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'admin',
    };
    const user = new User();
    Object.assign(user, userDto);

    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(userDto)).toEqual(user);
  });
});
