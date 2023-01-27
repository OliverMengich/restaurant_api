import { getCustomers, 
    createCustomer, 
    getCustomerById, 
    updateCustomer, 
    deleteCustomer } from '../services/customer.services.js';
export const getAllCustomers = async (req,res)=> {
    try {
        const customers = await getCustomers();
        return res.json({
            customers: customers,
            status: 'success'
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({error: err});
    }
};
export const createACustomer = async (req,res)=>{
    console.log(req.userInfo);
    try {
        const customer = await createCustomer(req.body);
        return res.json({
            customer,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error: "Try Again. Email is taken"})
    }
}
export const getACustomer = async (req,res)=>{
    try {
        const customer = await getCustomerById(req.params.id);
        return res.json({
            customer,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const updateACustomer = async (req,res)=>{
    try {
        const customer = await updateCustomer(req.params.id,req.body);
        return res.json({
            customer,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const deleteACustomer = async(req,res)=>{
    try {
        const res = await deleteCustomer(req.params.id);
        return res.json(res)
    } catch (error) {
        return res.status(500).json({error})
    }
}