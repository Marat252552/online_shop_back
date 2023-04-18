"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeBrand = exports.Rating = exports.Type = exports.Brand = exports.DeviceInfo = exports.Item = exports.BasketDevice = exports.Basket = exports.User = void 0;
const db_1 = __importDefault(require("./db"));
const sequelize_1 = require("sequelize");
exports.User = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: 'USER' }
});
exports.Basket = db_1.default.define('basket', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
exports.BasketDevice = db_1.default.define('basket_device', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
exports.Item = db_1.default.define('item', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    rating: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    imgName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
});
exports.DeviceInfo = db_1.default.define('device_info', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false }
});
exports.Brand = db_1.default.define('brand', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    imgName: { type: sequelize_1.DataTypes.STRING, unique: true }
});
exports.Type = db_1.default.define('type', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, unique: true }
});
exports.Rating = db_1.default.define('rating', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: sequelize_1.DataTypes.INTEGER }
});
exports.TypeBrand = db_1.default.define('type_brand', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});
exports.User.hasOne(exports.Basket);
exports.Basket.belongsTo(exports.User);
exports.User.hasMany(exports.Rating);
exports.Rating.belongsTo(exports.User);
exports.Basket.hasMany(exports.BasketDevice);
exports.BasketDevice.belongsTo(exports.Basket);
exports.Basket.hasMany(exports.BasketDevice);
exports.BasketDevice.belongsTo(exports.Basket);
exports.Item.hasMany(exports.BasketDevice);
exports.BasketDevice.belongsTo(exports.Item);
exports.Item.hasMany(exports.DeviceInfo);
exports.DeviceInfo.belongsTo(exports.Item);
exports.Brand.hasMany(exports.Item);
exports.Item.belongsTo(exports.Brand);
exports.Type.hasMany(exports.Item);
exports.Item.belongsTo(exports.Type);
exports.Item.hasMany(exports.Rating);
exports.Rating.belongsTo(exports.Item);
exports.Type.belongsToMany(exports.Brand, { through: exports.TypeBrand });
exports.Brand.belongsToMany(exports.Type, { through: exports.TypeBrand });
