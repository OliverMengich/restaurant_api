import chai, { expect } from 'chai';
import { getAllCustomers,createACustomer,deleteACustomer,getACustomer,updateACustomer } from '../../src/controllers/customer.controller.js';
import { getCustomers,createCustomer } from '../../src/services/customer.services.js';
chai.should()
chai.expect()
describe('Unit Testing',()=>{
    describe('Test 1',()=>{
        it('Expect customers',async ()=>{
            const rs = await getCustomers();
            console.log('testing data returned is: ',rs);
            expect(rs).to.be.an('array');
        })
    })
    describe('Test 2',()=>{
        it('Add A new customer',async()=>{
            const newCustomer = {
                firstName: "test",
                lastName: "test",
                email: "email@gmail.com",
                birthday: new Date().toISOString(),
            }
            const rs = await createCustomer(newCustomer);
            expect(rs).to.be.an('object');
        })
    })
    //get orders from customers
})