import { getReservations, createReservation,deleteReservation,getReservationById,updateReservation } from "../services/reservations.services.js";
export const getAllReservations = async (req,res)=>{
    try {
        const reservations = await getReservations();
        return res.json({
            reservations,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const createAReservation = async (req,res)=>{
    try {
        const reservation = await createReservation(req.body);
        return res.json({
            reservation,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const getAReservation = async (req,res)=>{
    try {
        const reservation = await getReservationById(req.params.id, req.userInfo.userId);
        return res.json({
            reservation,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const updateAReservation = async (req,res)=>{
    try {
        const reservation = await updateReservation(req.params.id,req.userInfo.userId, req.body);
        return res.json({
            reservation,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({error})
    }
}
export const deleteAReservation = async (req,res)=>{
    try {
        const res = await deleteReservation(req.params.id, req.userInfo.userId);
        return res.json(res)
    } catch (error) {
        return res.status(500).json({error})
    }
}
