import chai, { expect } from 'chai';
// import { getAllCustomers,createACustomer,deleteACustomer,getACustomer,updateACustomer } from '../../src/controllers/customer.controller.js';
import { getCustomers,createCustomer, deleteCustomer, getCustomerById,updateCustomer } from '../../src/services/customer.services.js';
import { getAllDishes,createDish,deleteDish,getDishById,updateDish } from '../../src/services/dishes.services.js';
import CustomersSchema from '../../src/models/customers.model.js';
import DishesSchema from '../../src/models/dishes.model.js';
chai.should()
chai.expect()
describe('Unit Testing',()=>{
    beforeEach('deletes all customers',()=>{
        CustomersSchema.destroy({where:{}}).then(console.log("deleted all"));
        // DishesSchema.destroy({where:{}}).then(console.log("deleted all dishs"));
    })
    describe('Customers Testing',()=>{
        it('Expect customers',async()=>{
            const rs = await getCustomers();
            expect(rs).to.be.an('array');
        })
        it("Adds an adminstrator", async () => {
            const newStaff = {
                firstName: "Admin1",
                lastName: "adminlast",
                email: "adminlast@gmail.com",
                userType: "ADMIN",
                birthday: new Date("2000-11-10").toISOString(),
                password: "password",
                phone: "1234567890",
            };
            const rs = await createCustomer(newStaff);
            expect(rs).to.be.an("object");
        });
        it("Add A new customer", async () => {
            const newCustomer = {
                firstName: "tesest12",
                lastName: "test12",
                email: "ema67@gmail.com",
                birthday: new Date().toISOString(),
                phone: "1234564780",
                password: "123456",
            };
            const rs = await createCustomer(newCustomer);
            expect(rs).to.be.an("object");
        });
    })
    describe('Dishes Testing',()=>{
        it('Fetches dishes',async()=>{
            const dishes = await getAllDishes();
            expect(dishes).to.be.an('array')
        })
        it('Adds dishes to Dishes Database',async()=>{
            const newDish = {
                name:'Lasagna',
                price:66.4,
                imageUrl: ['https:exampleimage.com','https://example2iage.com'],
                description:'Good Lasagna',
                category:'BREAKFAST'
            }
            const rs = await createDish(newDish);
            expect(rs).to.be.an('object')
        })
        it('Updates a dish information',async()=>{
            const newUpdate={
                imageUrl: ['https://unsplashimage1.com','https://unsplashimage.com'],
                price:34.4,
                name:'Burger'
            }
            const updated = await updateDish('f7ed52ea-6d95-4d46-8690-fdbf80aed886',newUpdate);
            updated.should.be.an('object');
        })
    })
})
