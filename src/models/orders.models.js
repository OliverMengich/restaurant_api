import sequelize from "../database/db.js";
import { DataTypes } from 'sequelize';
const OrdersSchema = sequelize.define('orders',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    customer:{
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
    delivered:{
        type: DataTypes.ENUM('PENDING','DELIVERED'),
        defaultValue: 'PENDING'
    }
},{
    timestamps: true
});
export default OrdersSchema;