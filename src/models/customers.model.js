import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
const CustomersSchema = sequelize.define('Customers',{
    customer_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    userType:{
        type: DataTypes.ENUM('USER','ADMIN'),
        allowNull: false,
        defaultValue: 'USER'
    }
});
//
//
export default CustomersSchema;