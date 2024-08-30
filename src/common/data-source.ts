import { User } from 'src/modules/user/user.entity';
import { DataSource } from 'typeorm';
// Importe outras entidades

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'cbatos29',
  entities: [User],
  synchronize: false,
  logging: true,
});
