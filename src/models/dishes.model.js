import {DataTypes} from 'sequelize';
import sequelize from '../database/db.js';
const DishesSchema = sequelize.define('Dishes',{
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.ENUM('BREAKFAST','LUNCH','DINNER','SNACKS','DRINKS'),
        allowNull: false
    },
    featured:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: true
});
export default DishesSchema;