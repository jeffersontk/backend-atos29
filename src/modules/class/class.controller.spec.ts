import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ClassModule } from './class.module';
import { TypeOrmModule } from '@nestjs/typeorm';

jest.setTimeout(25000); // Aumenta o timeout para 10 segundos

describe('ClassController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'admin',
          database: 'cbatos29',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        ClassModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/classes (POST)', async () => {
    return request(app.getHttpServer())
      .post('/classes')
      .send({ name: 'Mathematics', teacherId: 1 })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Mathematics');
      });
  });

  it('/classes (GET)', async () => {
    return request(app.getHttpServer())
      .get('/classes')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});
