import { Router } from 'express';
import CustomersSchema from '../models/customers.model.js';
import DishesSchema from '../models/dishes.model.js';
import OrdersSchema from '../models/orders.models.js';
import FavouriteDishes from '../models/favouritedishes.model.js';
import {getAllCustomers, createACustomer, getACustomer,deleteACustomer,updateACustomer} from '../controllers/customer.controller.js'
import { getDishes,createADish,deleteADish,getADish,updateADish } from '../controllers/dishes.controller.js';
import { getOrders,createAnOrder,deleteAnOrder,getAnOrder,updateAnOrder } from '../controllers/orders.controller.js';
import { login } from '../controllers/auth.controller.js';
import func1 from '../middlewares/index.js'
OrdersSchema.belongsTo(CustomersSchema,{foreignKey: 'customer',});
OrdersSchema.belongsTo(DishesSchema,{foreignKey: 'dishes',});
CustomersSchema.hasMany(FavouriteDishes,{onDelete: 'CASCADE'})
CustomersSchema.hasMany(OrdersSchema)
const router = Router();
router.get('/', (req, res) => {
    res.send('<h1>Welcome to restaurant API</h1>');
});
router.get('/restaurant', function (req, res) {
    res.send('<h2>Restaurant Route</h2>')
})
router.route("/customers").get(getAllCustomers).post(createACustomer);
router.route("/customer/:id").get(getACustomer).put(updateACustomer).delete(deleteACustomer);
router.route("/auth").get((req,res)=>{
    res.send('Login here')
}).post(login)
router.route("/dishes").get(func1,getDishes).post(func1, createADish);
router.route("/dishes/:id").get(getADish).put(updateADish).delete(deleteADish);
router.route("/orders").get(getOrders).post(createAnOrder);
router.route("/order/:id").get(getAnOrder).put(updateAnOrder).delete(deleteAnOrder);
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