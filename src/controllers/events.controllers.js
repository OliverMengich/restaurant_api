import { getEvents, getEventById, createEvent, deleteEvent, updateEvent } from "../services/events.services.js";

export const getAllEvents = async (req, res) => {
    try {
        const events = await getEvents();
        return res.json({
            events: events,
            status: 'success'
        })
    } catch (err) {
        console.log(err);
        return res.status(404).json({ error: err });
    }
}
export const createAnEvent = async (req, res) => {
    try {
        const event = await createEvent(req.body);
        return res.json({
            event,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error: "Try Again" })
    }
}
export const getAnEvent = async (req, res) => {
    try {
        const event = await getEventById(req.params.id, req.userInfo.userId);
        return res.json({
            event,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const updateAnEvent = async (req, res) => {
    try {
        const event = await updateEvent(req.params.id, req.userInfo.userId, req.body);
        return res.json({
            event,
            status: 'success'
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
export const deleteAnEvent = async (req, res) => {
    try {
        const res = await deleteEvent(req.params.id, req.userInfo.userId);
        return res.json(res)
    } catch (error) {
        return res.status(500).json({ error })
    }
}