import CustomersSchema from "../models/customers.model.js";
import OrdersSchema from "../models/orders.models.js";
export const getCustomers =async function () {
    try {
        const customers = await CustomersSchema.findAll({
            where:{
                userType: "USER"
            },
        });
        return customers;
    } catch (error) {
        console.log(error);
    }
}
export const createCustomer = async function (customerData) {
    const doesUserExist = await CustomersSchema.findOne({
        where:{
            email: customerData.email
        }
    });
    if(doesUserExist){
        throw new Error('User already exists');
    }
    const customer = await CustomersSchema.create({ ...customerData });
    return customer;
}
export const getCustomerById = async function (id) {
    const customer = await CustomersSchema.findByPk(id,{
        include:[{
            model: OrdersSchema,
            foreignKey: 'CustomerCustomerId'
        }]
    });
    console.log(customer);
    return customer;
}
export const updateCustomer = async function (id,update) {
    const customer = await CustomersSchema.findByPk(id);
    if(!customer){
        return{error: 'No Customer found!!'}
    }
    customer.set({
        ...update
    });
    await customer.save();
    return customer;
}
export const deleteCustomer = async function(id){
    const customer = await CustomersSchema.findByPk(id);
    if(!customer){
        return{error: 'No Customer found!!'}
    }
    const res =await customer.destroy();
    console.log(res);
    return {msg:'customer deleted'}
}