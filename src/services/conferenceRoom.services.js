import ConferenceRoom from "../models/conferenceRoom.model.js";

export const getConferenceRooms = async function () {
    try {
        const conferenceRooms = await ConferenceRoom.findAll();
        return conferenceRooms;
    } catch (error) {
        return { error: 'Error encountered'}
    }
}
// only an admin can create a conference room
export const createConferenceRoom = async function (conferenceRoomData) {
    try {
        const conferenceRoom = await ConferenceRoom.create({ ...conferenceRoomData });
        return conferenceRoom;
    } catch (error) {
        
        return { error: 'Error encountered'}
    }
}
export const getConferenceRoomById = async function (id, customerId) {
    const conferenceRoom = await ConferenceRoom.findOne({
        where:{
            id
        }
    });
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
    update.imageUrl? update.imageUrl = [...conferenceRoom.imageUrl, ...update.imageUrl]:'';
    conferenceRoom.set({
        ...update
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
    return { msg: 'conference room deleted' }
}
