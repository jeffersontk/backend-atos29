import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EnrollmentModule } from './enrollment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('EnrollmentController (e2e)', () => {
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
          autoLoadEntities: true,
          synchronize: true,
        }),
        EnrollmentModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/enrollments (POST)', async () => {
    return request(app.getHttpServer())
      .post('/enrollments')
      .send({
        userId: 13,
        classId: 1,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.createdAt).toBeDefined();
      });
  });

  it('/enrollments (GET)', async () => {
    return request(app.getHttpServer())
      .get('/enrollments')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });
});
