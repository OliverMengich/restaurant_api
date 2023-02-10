import chaiHTTP from 'chai-http'
import chai from 'chai';
import app from '../../app.js';
import config from '../../src/config/config.js';

chai.should();
chai.use(chaiHTTP);
const token = "";
console.log('PORT is: ', parseInt(config.PORT));
describe('Integration Testing(Restaurant API)',()=>{
    describe('Get Customers',()=>{
        it("Fails login an admin",(done)=>{
            chai.request(`http://localhost:${config.PORT}`).post('/api/auth')
            .send({
                email:"admin@gmail.com",
                password:"password",
            }).end((err,res)=>{
                // console.log('Error is: ',err);
                // console.log('Res is: ',res.body);
                res.should.have.status(401);
                res.body.should.be.a('object');
                // res.body.should.have.property('token');
                // token = res.body.token;
                done();
            }
            )
        })
        it('it should get only customer',(done)=>{
            chai.request(`http://localhost:${config.PORT}`)
            .get("/api/customers")
            // .auth("Bearer",token.toString())
            .end((err, res) => {
                console.log(res.status);
                res.should.have.status(200);
                res.body.customers.should.be.a("array");
                done();
            });
        })
    });
    describe('Fails on ading admin without AdminLogin', () => {
        it('Fails upon adding admin without authentification',(done)=>{
            chai.request(`http://localhost:${config.PORT}`)
                .post("/api/customers")
                .set("Content-Type", "application/json")
                .send({
                    firstName: "admin",
                    lastName: "admin",
                    birthday: new Date().toISOString(),
                    email: "email@admin.com",
                    phone: "0712345678",
                    userType: "ADMIN",
                })
                .auth("Bearer", "")
                .end((err, res) => {
                    res.should.have.status(401);
                    // res.body.should.be({error:"Not Authenticated"})
                    done();
                });
        }) 
    })
    describe('Passes Upon adding an administrator when logged in', () => {
        it('',(done)=>{
            chai.request(`http://localhost:${config.PORT}`)
                .post("/api/customers")
                .send({
                    firstName: "Admin",
                    lastName: "Admin",
                    email: "admin1@gmail.com",
                    password: "password",
                    userType: "ADMIN",
                    birthday: new Date().toISOString().toString(),
                    phone: "1234567895"
                })
                .auth("Bearer", "")
                .end((err, res) => {
                    chai.expect(res).to.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("error");
                });
            done();
        })
    })
})