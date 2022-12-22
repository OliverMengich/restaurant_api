import {Sequelize} from 'sequelize';
const sequelize = new Sequelize('your_db','your_username','your_password',{
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate().then(()=>console.log("Connected to the Database"))

export default sequelize;