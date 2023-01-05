import Event from "../models/events.model.js";
export const getEvents = async function () {
    try {
        const events = await Event.findAll();
        return events;
    } catch (error) {
        console.log(error);
    }
}
export const createEvent = async function (eventData) {
    const event = await Event.create({ ...eventData });
    return event;
}
export const getEventById = async function (id,customerId) {
    const event = await Event.findOne({
        where: {
            id: id,
            customer: customerId
        }
    });
    console.log(event);
    return event;
}
export const updateEvent = async function (id, customerId, update) {
    const event = await Event.findOne({
        where: {
            id: id,
            customer: customerId
        }
    });
    if (!event) {
        return { error: 'No Event found!!' }
    }
    event.set({
        ...update
    });
    await event.save();
    return event;
}
export const deleteEvent = async function (id, customerId) {
    const event = await Event.findOne({
        where: {
            id: id,
            customer: customerId
        }
    });
    if (!event) {
        return { error: 'No Event found!!' }
    }
    const res = await event.destroy();
    console.log(res);
    return { msg: 'event deleted' }
}