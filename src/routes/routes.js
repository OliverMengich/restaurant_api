import { Router } from 'express';
import CustomersSchema from '../models/customers.model.js';
import DishesSchema from '../models/dishes.model.js';
import OrdersSchema from '../models/orders.models.js';
import FavouriteDishes from '../models/favouritedishes.model.js';
import Reservation from '../models/reservations.model.js';
import Event from '../models/events.model.js';
import {getAllCustomers, createACustomer, getACustomer,deleteACustomer,updateACustomer} from '../controllers/customer.controller.js'
import { getDishes,createADish,deleteADish,getADish,updateADish } from '../controllers/dishes.controller.js';
import { getOrders,createAnOrder,deleteAnOrder,getAnOrder,updateAnOrder } from '../controllers/orders.controller.js';
import { login } from '../controllers/auth.controller.js';
import { getAllConferenceRooms, createAConferenceRoom, deleteAConferenceRoom, getAConferenceRoom, updateAConferenceRoom } from '../controllers/conferenceRooms.controllers.js';
import { getAllEvents,createAnEvent, deleteAnEvent,getAnEvent,updateAnEvent } from '../controllers/events.controllers.js';
import { getAllReservations,createAReservation,deleteAReservation,getAReservation,updateAReservation } from '../controllers/reservations.controllers.js';
import { getAllRooms,createARoom,deleteARoom,getARoom,updateARoom } from '../controllers/rooms.controllers.js';
import { getAllFavouriteDishes,addFavouriteDish,removeFavouriteDish } from '../controllers/favouritesdishes.controllers.js';
import customerAuthMiddleware from '../middlewares/customer_Auth.js';
import adminAuthMiddleware from '../middlewares/admin_auth.js';
OrdersSchema.belongsTo(CustomersSchema,{foreignKey: 'customer', onDelete: 'CASCADE'});
OrdersSchema.belongsTo(DishesSchema,{foreignKey: 'dishes',});
FavouriteDishes.belongsTo(CustomersSchema, {
    foreignKey: "customer",
    onDelete: "CASCADE",
});
// CustomersSchema.hasMany(OrdersSchema);
DishesSchema.hasMany(Reservation,{foreignKey: 'dishes', constraints: true, onDelete: 'CASCADE'});
Reservation.belongsTo(CustomersSchema,{foreignKey: 'customer', constraints: false, onDelete: 'CASCADE'});
const router = Router();
router.get('/', (req, res) => {
    res.send('<h1>Welcome to restaurant API</h1>');
});
router.get('/restaurant', function (req, res) {
    res.send('<h2>Restaurant Route</h2>')
})
router.route("/customers").get(getAllCustomers).post(adminAuthMiddleware, createACustomer);
router.route("/customer/:id").get(getACustomer).put(updateACustomer).delete(deleteACustomer);
router.route("/auth").get((req,res)=>{res.send('Login here')}).post(login)
router.route("/dishes").get(getDishes).post(adminAuthMiddleware, createADish);
router.route("/dishes/:id").get(getADish).put(adminAuthMiddleware,updateADish).delete(adminAuthMiddleware, deleteADish);
router.route("/orders").get(adminAuthMiddleware,getOrders).post(customerAuthMiddleware, createAnOrder);
router.route("/order/:id").get(customerAuthMiddleware,getAnOrder).put(customerAuthMiddleware, updateAnOrder).delete(customerAuthMiddleware, deleteAnOrder);

router.route("/conference-rooms").get(getAllConferenceRooms).post(adminAuthMiddleware, createAConferenceRoom);
router.route("/conferenceRoom/:id").get(getAConferenceRoom).put(adminAuthMiddleware, updateAConferenceRoom).delete(adminAuthMiddleware, deleteAConferenceRoom);
router.route("/events").get(getAllEvents).post((adminAuthMiddleware || customerAuthMiddleware ), createAnEvent);
router.route("/event/:id").get(getAnEvent).put(adminAuthMiddleware, updateAnEvent).delete(adminAuthMiddleware, deleteAnEvent);
router.route("/reservations").get(getAllReservations).post((customerAuthMiddleware || adminAuthMiddleware), createAReservation);
router.route("/reservation/:id").get(getAReservation).put((customerAuthMiddleware || adminAuthMiddleware), updateAReservation).delete(customerAuthMiddleware, deleteAReservation);
router.route("/rooms").get(getAllRooms).post(adminAuthMiddleware, createARoom);
router.route("/room/:id").get(getARoom).put(adminAuthMiddleware, updateARoom).delete(adminAuthMiddleware, deleteARoom);

router.route("/favouritedishes").get((adminAuthMiddleware ||customerAuthMiddleware), getAllFavouriteDishes).post((adminAuthMiddleware ||customerAuthMiddleware),addFavouriteDish)
router.route("favouritedish/:id").delete((adminAuthMiddleware || customerAuthMiddleware), removeFavouriteDish);
router.get('/staff',async function (req, res) {
    // filter the output time users of type ADMIN
    const staffMembers =await CustomersSchema.findAll({
        where:{
            userType: "ADMIN"
        }
    });
    console.log(staffMembers);
    return res.json({
        staffMembers
    })
})
export default router;