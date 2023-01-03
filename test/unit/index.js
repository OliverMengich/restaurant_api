import chai, { expect } from 'chai';
import { getAllCustomers,createACustomer,deleteACustomer,getACustomer,updateACustomer } from '../../src/controllers/customer.controller.js';
import { getCustomers,createCustomer } from '../../src/services/customer.services.js';
import CustomersSchema from '../../src/models/customers.model.js';
chai.should()
chai.expect()
describe('Unit Testing',()=>{
    
    describe('Test 1',()=>{
        it('Expect customers',async ()=>{
            const rs = await getCustomers();
            expect(rs).to.be.an('array');
        })
    })
    before('Deletes all data',()=>{
        CustomersSchema.destroy({where: {}}).then(()=>{
            console.log('Done Deleting All')
        })
    })
    describe('Test 2',()=>{
        it('Add A new customer',async()=>{
            const newCustomer = {
                firstName: "test12",
                lastName: "test12",
                email: "email12@gmail.com",
                birthday: new Date().toISOString(),
            }
            const rs = await createCustomer(newCustomer);
            expect(rs).to.be.an('object');
        })
    })
    describe('Adds a Staff Member',()=>{
        it('Adds an adminstrator',async ()=>{
            const newStaff = {
                firstName: 'Admin1',
                lastName: 'adminlast',
                email:'staff1@gmail.com',
                userType: 'ADMIN',
                birthday: new Date('2000-11-10').toISOString()
            }
            const rs = await createCustomer(newStaff);
            expect(rs).to.be.an('object');
        })
    })
    //get orders from customers
})