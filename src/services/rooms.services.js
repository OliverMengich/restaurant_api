import { Sequelize } from "sequelize";
import Accommodation from "../models/rooms.model.js";
import sequelize from "../database/db.js";
export const getRooms = async function (limit) {
    try {
        if (limit) {
            const rooms = await Accommodation.findAll({
                limit: parseInt(limit.split('=')[1]),
                order: sequelize.random()
            });
            return rooms;
        }
        const rooms = await Accommodation.findAll();
        return rooms;
    } catch (error) {
        console.log(error);
    }
}
export const createRoom = async function (roomData) {
    const room = await Accommodation.create({ ...roomData});
    return room;
}
export const getRoomById = async function (id) {
    const room = await Accommodation.findByPk(id);
    console.log(room);
    return room;
}
export const updateRoom = async function (id, update) {
    const room = await Accommodation.findByPk(id);
    if (!room) {
        return { error: 'No Room found!!' }
    }
    update.imageUrl? [...room.imageUrl,...update.imageUrl]:'';
    room.set({
        ...update
    });
    await room.save();
    return room;
}
export const deleteRoom = async function (id) {
    const room = await Accommodation.findByPk(id);
    if (!room) {
        return { error: 'No Room found!!' }
    }
    const res = await room.destroy();
    console.log(res);
    return { msg: 'room deleted' }
}
