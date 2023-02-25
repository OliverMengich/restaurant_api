import OrdersSchema from "../models/orders.models.js";
import CustomersSchema from "../models/customers.model.js";
export const getAllOrders = async function () {
    try {
        const orders = await OrdersSchema.findAll({
            include:[{
                model: CustomersSchema,
                foreignKey: 'customer',
                attributes: ['customer_id', 'email', 'birthday', 'firstName', 'lastName', 'phone'],
            }]
        });
        return orders
    } catch (error) {
        return {error:"error"};
    }
    
};
export const createOrder = async function(orderData){
    if (!orderData) {
        throw new Error("No data Provided")
    }
    const order = await OrdersSchema.create({...orderData})
    return order;
}
export const getOrderById = async function (id,userId) {
    try {
        const order = await OrdersSchema.findOne({
            where:{
                id:id,
                customer: userId
            },
            include:[{
                model: CustomersSchema,
                foreignKey: 'customer',
                attributes: ['customer_id', 'email', 'birthday', 'firstName', 'lastName', 'phone'],
            }]
        });
        return order;
    } catch (error) {
        return {error:"error"};
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
        ...updateOrderData,
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
    return {msg:'Order deleted'}
}