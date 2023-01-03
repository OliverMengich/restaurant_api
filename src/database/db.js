import {Sequelize} from 'sequelize';
import config from '../config/config.js';
const sequelize = new Sequelize(config.DATABASE_URL,{
    host: config.HOST,
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate().then(()=>console.log("Connected to the Database"))

export default sequelize;