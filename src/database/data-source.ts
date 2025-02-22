import { MikroORM, Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import * as dotenv from 'dotenv';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const mikroOrmConfig: Options<MySqlDriver> = {
  driver: MySqlDriver, // Use the correct driver
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  entities: [process.env.DB_ENTITIES],
  migrations: {
    path: process.env.DB_MIGRATIONS || 'migrations',
    tableName: 'migrations',
  },
  debug: isDevelopment,
};

export const initializeDataSource = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  return orm;
};

export default mikroOrmConfig;
