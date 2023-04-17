import { Sequelize } from "sequelize";



const db = new Sequelize(
    'online_shop',
    'postgres',
    'T69Ru251',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    }
)

export default db