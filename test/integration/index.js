import chaiHTTP from 'chai-http'
import config from '../../src/config/config.js';
import chai from 'chai';
chai.should();
chai.use(chaiHTTP);
describe('Integration Testing(Restaurant API)',()=>{
    describe('Get Customers',()=>{
        it('it should get only customer',(done)=>{
            chai.request(`http://localhost:${config.PORT}/api`).get('/customers')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.customers.should.be.a('array');
                done()
            })
        })
    })
})