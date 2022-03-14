import { Dialect, Sequelize } from 'sequelize';

const dbName = (process.env.DB_NAME || 'streamid') as string;
const dbUser = (process.env.DB_USER || 'postgres') as string;
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbDriver = (process.env.DB_DRIVER || 'postgres') as Dialect;
const dbPassword = process.env.DB_PASSWORD || '123random';

export const db = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});
