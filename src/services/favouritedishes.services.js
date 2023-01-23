import CustomersSchema from "../models/customers.model.js";
import FavouriteDishes from "../models/favouritedishes.model.js";
export const getFavouriteDishes = async function(customer) {
    try {
        const favouritedishes = await FavouriteDishes.findAll({
            where:{
                customer
            },
            include:[{
                model: CustomersSchema,
                foreignKey: 'customer'
            }]
        })
        return favouritedishes
    } catch (error) {
        console.log(error);
        return {error:"error"};
    }
}
export const addAFavouriteDish = async function (dishData) {
    if (!dishData) {
        throw new Error("No dish")
    }
    try {
        const dish = await FavouriteDishes.create({...dishData});
        return dish;
    } catch (error) {
        return {error}
    }
}
export const removeAFavouriteDish = async function(id, customer){
    try {
        const removingDish = await FavouriteDishes.findOne({
            id,
            customer
        })
        if (!removingDish) {
            return {error: "No Dish"}
        }
        const res = await removingDish.destroy();
        console.log(res);
        return {msg: "Dish removed"}
    } catch (error) {
        return {error}
    }
}