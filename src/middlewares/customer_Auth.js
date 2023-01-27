console.log('Middleware loaded');
import CustomersSchema from '../models/customers.model.js';
import CryptoJS from 'crypto-js';
export default async function(req,res,next){
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify({'username':'Oliver'}), 'Hello_Secret').toString(); 
    // console.log(encrypted);
    let authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(401).json({error: 'Not Authenticated'})
    }
    authToken = authToken.split(' ')[1];
    console.log(authToken);
    if (!authToken){
        return res.status(401).json({error: 'Not Authenticated'})
    }
    let decrypted = CryptoJS.AES.decrypt(authToken, 'Hello_Secret').toString(CryptoJS.enc.Utf8);
    decrypted = JSON.parse(decrypted);
    const admin = await CustomersSchema.findOne({
        where:{
            customer_id: decrypted.userId,
            userType: "USER"
        }
    });
    if (!admin) {
        return res.status(401).json({ error: "Not Authenticated" });
    }
    if((!decrypted || !decrypted.userId) && decrypted.userType !== 'USER'){
        return res.status(401).json({error: 'Not Authenticated'})
    }
    req.userInfo=decrypted;
    next();
}