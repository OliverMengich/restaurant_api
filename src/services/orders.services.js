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
        console.log(orders);
        return orders
    } catch (error) {
        console.log(error);
    }
    
};
export const createOrder = async function(orderData){
    console.log(req.body);
    if (!req.body) {
        return;
    }
    const order = await OrdersSchema.create({...orderData})
    return order;
}
export const getOrderById = async function (id) {
    const order = await OrdersSchema.findByPk(id,{
        include:[{
            model: CustomersSchema
        }]
    });
    return order;
};
export const updateOrder = async function (id, updateOrderData) {
    const order = await OrdersSchema.findByPk(id);
    order.set({
        ...updateOrderData
    });
    await order.save();
    return order;
};
export const deleteOrder = async function(id){
    const order = await OrdersSchema.findByPk(id);
    if(!customer){
        return{error: 'No Order found!!'}
    }
    const res =await order.destroy();
    console.log(res);
    return {msg:'customer deleted'}
}