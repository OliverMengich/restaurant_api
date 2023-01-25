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
    });
    describe('Fails on ading admin without AdminLogin', () => { 
        chai.request(`http://localhost:${config.PORT}/api`).post('/customer')
        .send({

        }).auth("Bearer","")
        .end((err,res)=>{
            res.should.have.status(401);
            res.body.should.be({error:"Not Authenticated"})
        })
    })
    describe('Passes Upon adding an administrator when logged in', () => {
        chai.request(`http://localhost:${config.PORT}/api`).post('/customer')
        .send({
            firstName:"Admin",
            lastName:"Admin",
            email:"admin1@gmail.com",
            password:"password",
            userType:"ADMIN"
        }).auth("Bearer","")
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be({message:"Admin Added"})
        })
    })

})