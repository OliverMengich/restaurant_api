import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
const ConferenceRoom = sequelize.define('ConferenceRoom',{
    // id, room number, seats, price,
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1
    },
    roomNumber: {   
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrl:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

export default ConferenceRoom;