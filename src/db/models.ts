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

export const Item = db.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.STRING, allowNull: false},
    imgName: {type: DataTypes.STRING, allowNull: false},
})

export const DeviceInfo = db.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false }
})

export const Brand = db.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    imgName: {type: DataTypes.STRING, unique: true}
})

export const Type = db.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

export const Rating = db.define('rating', {
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

Item.hasMany(BasketDevice)
BasketDevice.belongsTo(Item)

Item.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Item)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Type.hasMany(Item)
Item.belongsTo(Type)

Item.hasMany(Rating)
Rating.belongsTo(Item)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})