import { getAllOrders, createOrder, deleteOrder, getOrderById, updateOrder } from "../services/orders.services.js";
export const getOrders = async (req,res)=>{
    try {
        const orders = await getAllOrders();
        return res.json({
            orders,
            status: 'success'
        })
    } catch (err) {
        res.status(404).json({error: err});
    }
}
export const createAnOrder = async (req,res)=>{
    console.log('Customer LoggedIn is: ',req.userInfo);
    try {
        const order = await createOrder({...req.body,
            customer: req.userInfo.userId
        });
        return res.json({
            order,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const getAnOrder = async (req,res)=>{
    console.log('Customer loggedIn is:',req.userInfo);
    try {
        const order = await getOrderById(req.params.id,req.userInfo.userId);
        if (order===null) {
            return res.status(404).json({error: 'Order not found'});
        }
        return res.json({
            order,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const updateAnOrder = async (req,res)=>{
    try {
        const order = await updateOrder(req.params.id,req.body);
        return res.json({
            order,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const deleteAnOrder = async(req,res)=>{
    try {
        const res = await deleteOrder(req.params.id);
        return res.json(res)
    } catch (error) {
        return res.status(500).json({error})
    }
}
