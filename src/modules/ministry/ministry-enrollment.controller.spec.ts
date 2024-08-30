import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinistryEnrollmentModule } from './ministry-enrollment.module';

jest.setTimeout(10000);

describe('MinistryEnrollmentController (e2e)', () => {
  let app: INestApplication;
  let createdId: number; // Para armazenar o ID criado

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
        MinistryEnrollmentModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ministry-enrollments (POST)', async () => {
    return request(app.getHttpServer())
      .post('/ministry-enrollments')
      .send({
        userId: 13,
        ministryId: 1,
      })
      .expect(201)
      .then((response) => {
        createdId = response.body.id; // Salva o ID criado
        expect(response.body).toHaveProperty('id');
        expect(response.body.userId).toBe(13);
        expect(response.body.ministryId).toBe(1);
      });
  });

  it('/ministry-enrollments/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/ministry-enrollments/${createdId}`) // Usa o ID criado
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.userId).toBe(13);
        expect(response.body.ministryId).toBe(1);
      });
  });
});
