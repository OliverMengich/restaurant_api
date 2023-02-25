import DishesSchema from "../models/dishes.model.js";
export const getAllDishes = async function (limit) {
    try {
        if (limit) {
            const dishes = await DishesSchema.findAll({
                limit: parseInt(limit.split('=')[1]),
                order: sequelize.random()
            });
            return dishes
        }
        const dishes = await DishesSchema.findAll();
        return dishes
    } catch (error) {
        return { error }
    }
}
export const createDish = async function (req) {
    if (!req) {
        throw new Error('No data Provided')
    }
    try {
        const dish = await DishesSchema.create({...req});
        return dish
    } catch (error) {
        return { error }
    }
}
export const getDishById = async function (id) {
    try {
        const dish = await DishesSchema.findByPk(id);
        return dish;
    } catch (error) {
        return {error}
    }
}
export const updateDish = async function (id, updateDishData) {
    try {
        const dish = await DishesSchema.findByPk(id);
        if(!dish){
            throw new Error("No dish found")
        }
        
        updateDishData.imageUrl? updateDishData.imageUrl = [...dish.imageUrl,...updateDishData.imageUrl]: '';
        dish.set({
            ...updateDishData,
        });
        await dish.save();
        return dish;
    } catch (error) {
        return {error: error.message}
    }
}
export const deleteDish = async function (id) {
    try {
        
        const dish = await DishesSchema.findByPk(id);
        if (!dish) {
            return { error: 'Error encountered' }
        }
        const res = await dish.destroy();
        return { msg: 'dish deleted' }
    } catch (error) {
        return { error: 'Error encountered' }
    }
}