import 'dotenv/config';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mssql',

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  synchronize: false,

  logging: false,

  entities: ['src/modules/**/*.entity.ts'],

  migrations: ['src/database/migrations/*.ts'],

  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
});
