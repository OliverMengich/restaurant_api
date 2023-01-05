import Reservation from "../models/reservations.model.js";
export const getReservations = async function () {
    try {
        const reservations = await Reservation.findAll();
        return reservations;
    } catch (error) {
        console.log(error);
    }
}
export const createReservation = async function (reservationData) {
    const reservation = await Reservation.create({ ...reservationData });
    return reservation;
}
export const getReservationById = async function (id, customerId) {
    const reservation = await Reservation.findOne({
        where: {
            id,
            customer: customerId
        }
    });
    if (!reservation) {
        throw new Error('No Reservation found!!');
    }
    console.log(reservation);
    return reservation;
}
export const updateReservation = async function (id, customerId, update) {
    const reservation = await Reservation.findOne({
        where: {
            id,
            customer: customerId
        }
    });
    if (!reservation) {
        throw new Error('No Reservation found!!');
    }
    reservation.set({
        ...update
    });
    await reservation.save();
    return reservation;
}
export const deleteReservation = async function (id, customerId) {
    const reservation = await Reservation.findOne({
        where: {
            id,
            customer: customerId
        }
    });
    if (!reservation) {
        throw new Error('No Reservation found!!');
    }
    const res = await reservation.destroy();
    console.log(res);
    return { msg: 'reservation deleted' }
}