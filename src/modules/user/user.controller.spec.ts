import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from './user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbdModule } from '../ebd/ebd.module'; // Importar o módulo Ebd
import { ClassModule } from '../class/class.module'; // Importar o módulo Class
import { CheckInModule } from '../ebdCheckIn/checkin.module';
// Importar o módulo Checkin

jest.setTimeout(10000); // Aumenta o timeout para 10 segundos

describe('UserController (e2e)', () => {
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
        UserModule,
        EbdModule,
        ClassModule,
        CheckInModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'member',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
      });
  });

  it('/users (GET)', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  // Teste para criar uma classe
  it('/classes (POST)', async () => {
    return request(app.getHttpServer())
      .post('/classes')
      .send({
        name: 'Class 101',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Class 101');
      });
  });

  it('/checkins (POST)', async () => {
    return request(app.getHttpServer())
      .post('/checkins')
      .send({
        userId: 18,
        classId: 44,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('class');
        expect(response.body).toHaveProperty('user');
        // Verifica as propriedades da classe
        expect(response.body.class).toHaveProperty('id');
        expect(response.body.class).toHaveProperty('name');
        // Verifica as propriedades do usuário
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('name');
        expect(response.body.user.id).toBe(18);
        expect(response.body.class.id).toBe(44);
      });
  });

  it('/checkins/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/checkins/4') // Substitua com um ID de check-in válido
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('class');
        expect(response.body).toHaveProperty('user');

        // Verifica as propriedades da classe
        expect(response.body.class).toHaveProperty('id');
        expect(response.body.class).toHaveProperty('name');

        // Verifica as propriedades do usuário
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user).toHaveProperty('name');
      });
  });
});
