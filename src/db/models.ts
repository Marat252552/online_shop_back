import db from "./db";
import {DataTypes} from 'sequelize'


export const User = db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

export const Basket = db.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

export const BasketDevice = db.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

export const Device = db.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

export const DeviceInfo = db.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false }
})

export const Brand = db.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

export const Type = db.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

export const Rating = db.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER}
})

export const TypeBrand = db.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})