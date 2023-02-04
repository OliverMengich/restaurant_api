import CustomersSchema from "../models/customers.model.js";
import CryptoJS from "crypto-js";
//login customer
export const loginCustomer = async function (email, password) {
    const customer = await CustomersSchema.findOne({
        where: {
            email,
        },
        attributes: ['customer_id', 'email', 'birthday', 'userType', 'password']
    });
    if (customer && customer.password ===password) {
        try {
            const customerObj = {
                userId: customer.customer_id,
                email: customer.email,
                birthday: customer.birthday,
                userType: customer.userType
            }
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(customerObj), 'Hello_Secret').toString();
            console.log(encrypted);
            return encrypted;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    return;
}
