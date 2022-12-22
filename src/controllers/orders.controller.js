import { getAllOrders, createOrder, deleteOrder, getOrderById, updateOrder } from "../services/orders.services.js";
export const getOrders = async (req,res)=>{
    try {
        const orders = await getAllOrders();
        console.log(orders);
        return res.json({
            orders,
            status: 'success'
        })
    } catch (err) {
        res.status(404).json({error: err});
    }
}
export const createAnOrder = async (req,res)=>{
    try {
        const order = await createOrder(req.body);
        return res.json({
            order,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const getAnOrder = async (req,res)=>{
    try {
        const order = await getOrderById(req.params.id);
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
