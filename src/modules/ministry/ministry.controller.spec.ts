import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MinistryModule } from './ministry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ministry } from './ministry.entity';

describe('MinistryController (e2e)', () => {
  let app: INestApplication;
  let ministryId: number; // To store the ID of the created ministry

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
        TypeOrmModule.forFeature([Ministry]),
        MinistryModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ministries (GET)', async () => {
    return request(app.getHttpServer())
      .get('/ministries')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/ministries (POST)', async () => {
    return request(app.getHttpServer())
      .post('/ministries')
      .send({ name: 'New Ministry' })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('New Ministry');
        ministryId = response.body.id;
      });
  });

  it('/ministries/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get(`/ministries/${ministryId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', ministryId);
        expect(response.body.name).toBe('New Ministry');
      });
  });
});
