import Reservation from "../models/reservations.model.js";
import DishesSchema from "../models/dishes.model.js";
export const getReservations = async function () {
    try {
        const reservations = await Reservation.findAll();
        console.log({...reservations});
        return reservations;
    } catch (error) {
        console.log(error);
    }
}
export const createReservation = async function (reservationData) {
    if(reservationData.meals){
        const dishesId = await (await DishesSchema.findAll()).reduce((acc,val)=>{
            acc.push(val.id)
            return acc;
        },[]);
        console.log('Dishes ID:', dishes)
        reservationData.meals.forEach(element => {
            if (dishesId.indexOf(element) === -1) {
                throw new Error("Meal not found, try adding again!!!");
            }
        });
    }
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