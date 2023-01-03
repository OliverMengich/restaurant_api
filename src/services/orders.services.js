import OrdersSchema from "../models/orders.models.js";
import CustomersSchema from "../models/customers.model.js";
export const getAllOrders = async function () {
    try {
        const orders = await OrdersSchema.findAll({
            include:[{
                model: CustomersSchema,
                foreignKey: 'customer'
            }]
        });
        // console.log(orders);
        return orders
    } catch (error) {
        console.log(error);
    }
    
};
export const createOrder = async function(orderData){
    // console.log(req.userInfo);
    if (!orderData) {
        throw new Error("No data Provided")
    }
    const order = await OrdersSchema.create({...orderData})
    return order;
}
export const getOrderById = async function (id,userId) {
    console.log(id,userId);
    try {
        const order = await OrdersSchema.findOne({
            where:{
                id:id,
                customer: userId
            },
            include:[{
                model: CustomersSchema,
                foreignKey: 'customer'
            }]
        });
        console.log(order);
        return order;
    } catch (error) {
        console.log(error);
    }
};
export const updateOrder = async function (id,userId, updateOrderData) {
    const order = await OrdersSchema.findOne({
        where:{
            id:id,
            customer: userId
        }
    });
    if (order===null) {
        return { error: "No Order found!!" };
    }
    order.set({
        ...updateOrderData
    });
    await order.save();
    return order;
};
export const deleteOrder = async function(id,userId){
    const order = await OrdersSchema.findOne({
        where:{
            id:id,
            customer: userId
        }
    });
    if(!order){
        return{error: 'No Order found!!'}
    }
    const res =await order.destroy();
    console.log(res);
    return {msg:'Order deleted'}
}