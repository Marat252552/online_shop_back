"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('online_shop', 'postgres', 'T69Ru251', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});
exports.default = db;
