import DishesSchema from "../models/dishes.model.js";
export const getAllDishes = async function () {
    try {
        const dishes = await DishesSchema.findAll();
        return dishes
    } catch (error) {
        return { error }
    }
}
export const createDish = async function (req, res) {
    if (!req.body) {
        return
    }
    try {
        const dish = await DishesSchema.create({...req.body});
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
        dish.set({
            ...updateDishData
        });
        await dish.save();
        return dish;
    } catch (error) {
        
    }
}
export const deleteDish = async function (id) {
    try {
        
        const dish = await DishesSchema.findByPk(id);
        if (!dish) {
            return { error: 'Error encountered' }
        }
        const res = await dish.destroy();
        console.log(res);
        return { msg: 'dish deleted' }
    } catch (error) {
        console.log(error);
        return { error: 'Error encountered' }
    }
}