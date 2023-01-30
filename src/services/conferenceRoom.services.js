import ConferenceRoom from "../models/conferenceRoom.model.js";

export const getConferenceRooms = async function () {
    try {
        const conferenceRooms = await ConferenceRoom.findAll();
        return conferenceRooms;
    } catch (error) {
        console.log(error);
    }
}
// only an admin can create a conference room
export const createConferenceRoom = async function (conferenceRoomData) {
    const conferenceRoom = await ConferenceRoom.create({ ...conferenceRoomData });
    return conferenceRoom;
}
export const getConferenceRoomById = async function (id, customerId) {
    const conferenceRoom = await ConferenceRoom.findOne({
        where:{
            id
        }
    });
    console.log(conferenceRoom);
    return conferenceRoom;
}
export const updateConferenceRoom = async function (id, update) {
    const conferenceRoom = await ConferenceRoom.findOne({
        where:{
            id
        }
    });
    if (!conferenceRoom) {
        return { error: 'No Conference Room found!!' }
    }
    conferenceRoom.set({
        ...update,
        imageUrl: [...conferenceRoom.imageUrl, ...update.imageUrl]
    });
    await conferenceRoom.save();
    return conferenceRoom;
}
export const deleteConferenceRoom = async function (id, customerId) {
    const conferenceRoom = await ConferenceRoom.findOne({
        where: {
            id
        }
    });
    if (!conferenceRoom) {
        return { error: 'No Conference Room found!!' }
    }
    const res = await conferenceRoom.destroy();
    console.log(res);
    return { msg: 'conference room deleted' }
}
