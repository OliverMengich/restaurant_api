import sequelize from "../database/db.js";
import { DataTypes } from 'sequelize';
const Event = sequelize.define('Events',{
    //date, time, room, customer, dishes, quantity, total
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    room: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'ConferenceRooms',
            key: 'id'
        }
    },
    customer: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Customers',
            key: 'customer_id'
        }
    },
    dishes: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Dishes',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
},{
    timestamps: true
});
export default Event;