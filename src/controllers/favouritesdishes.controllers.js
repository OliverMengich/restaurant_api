import { getFavouriteDishes,addAFavouriteDish,removeAFavouriteDish, getAFavouriteDish } from "../services/favouritedishes.services.js";
export const getAllFavouriteDishes = async function(req,res){
    console.log(req.userInfo);
    try {
        const favouritedishes = await getFavouriteDishes(req.userInfo.userId);
        return res.status(200).json({
            favouritedishes,
            status: "success"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: err });
    }
}
export const getCustomerFavouriteDish = async function (req,res) {
    let customer = '';
    console.log(req.userInfo);
    if (req.userInfo) {
        customer = req.userInfo.userId;
    }else{
        customer = req.body.customer
    }
    try {
        const favouritedish = await getAFavouriteDish(req.params.dishId,customer);
        return res.status(200).json({
            favouritedish,
            status: "success"
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({ err });
    }
}
export const addFavouriteDish = async function(req,res) {
    let customer = '';
    console.log(req.userInfo);
    if (req.userInfo) {
        customer = req.userInfo.userId;
    }else{
        customer = req.body.customer
    }
    try {
        const addedDish =await addAFavouriteDish({...req.body,customer});
        return res.json({
            dish: addedDish,
            status:"success"
        })
    } catch (error) {
        console.log(err);
        return res.status(404).json({ error: err });
    }
}
export const removeFavouriteDish = async function(req,res){
    let customer = '';
    if (req.userInfo) {
        customer = req.userInfo.customer;
    }else{
        customer = req.body.customer;
    }
    try {
        const removedDish = await removeAFavouriteDish(req.body.id,customer);
        return res.json({
            dish: removedDish,
            status: "success",
        });
    } catch (error) {
        console.log(err);
        return res.status(404).json({ error: err });
    }
}