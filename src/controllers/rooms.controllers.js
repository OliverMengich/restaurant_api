import { getRooms, createRoom, deleteRoom, getRoomById, updateRoom } from "../services/rooms.services.js";

export const getAllRooms = async (req, res) => {
    try {
        if(req.params.limit){
            const rooms = await getRooms(req.params.limit);
            return res.json({
                rooms,
                status: 'success'
            })
        }
        console.log("No limit passed");
        const rooms = await getRooms();
        return res.json({
            rooms,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
// these routes are only accessible to the admin
export const createARoom = async (req, res) => {
    try {
        const room = await createRoom(req.body);
        return res.json({
            room,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const getARoom = async (req, res) => {
    try {
        const room = await getRoomById(req.params.id);
        return res.json({
            room,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const updateARoom = async (req, res) => {
    try {
        const room = await updateRoom(req.params.id, req.body);
        return res.json({
            room,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const deleteARoom = async (req, res) => {
    try {
        const res = await deleteRoom(req.params.id);
        return res.json(res)
    } catch (error) {
        return res.status(500).json({ error })
    }
}