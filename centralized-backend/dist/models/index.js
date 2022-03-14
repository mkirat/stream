"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const dbName = (process.env.DB_NAME || 'streamid');
const dbUser = (process.env.DB_USER || 'postgres');
const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbDriver = (process.env.DB_DRIVER || 'postgres');
const dbPassword = process.env.DB_PASSWORD || '123random';
exports.db = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
});
//# sourceMappingURL=index.js.map