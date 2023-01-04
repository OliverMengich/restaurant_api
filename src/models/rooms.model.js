import sequelize from "../database/db";
import { DataTypes } from 'sequelize';
const Accommodation = sequelize.define('Accommodation',{
    // id, bed type price, room number, room type, room size, room description, room image, room status
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1
    },
    bedType: {
        type: DataTypes.ENUM('SINGLE','DOUBLE','TRIPLE'),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomType: {
        type: DataTypes.ENUM('SINGLE','DOUBLE','TRIPLE'),
        allowNull: false,
    },
    roomSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roomDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomImage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomStatus: {
        type: DataTypes.ENUM('AVAILABLE','NOT AVAILABLE'),
        allowNull: false,
    }
},{
    timestamps: true
})