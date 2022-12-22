import sequelize from "../database/db.js";
import { DataTypes } from 'sequelize';
const FavouriteDishes = sequelize.define('FavouriteDishes',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    dish:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'Dishes',
            key: 'id'
        }
    },
    customer:{
        type: DataTypes.UUID,
        allowNull: false,
        references:{
            model: 'Customers',
            key: 'customer_id'
        }
    }
});
export default FavouriteDishes;