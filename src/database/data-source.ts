import { MikroORM, Options } from '@mikro-orm/core';
import { MySqlDriver } from '@mikro-orm/mysql';
import * as dotenv from 'dotenv';
import { Task } from 'src/modules/task/entities/task.entitiy';

dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

const mikroOrmConfig: Options<MySqlDriver> = {
  driver: MySqlDriver,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  entities: [Task],
  entitiesTs: [Task],
  migrations: {
    path: process.env.DB_MIGRATIONS || 'migrations',
    tableName: 'migrations',
  },
  debug: isDevelopment,
  allowGlobalContext: true,
};

export const initializeDataSource = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getSchemaGenerator().ensureDatabase();
  await orm.getSchemaGenerator().updateSchema();
  return orm;
};

export default mikroOrmConfig;
