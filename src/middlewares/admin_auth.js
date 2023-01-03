console.log('Middleware loaded');
import CryptoJS from 'crypto-js';
export default  function(req,res,next){
    let authToken = req.headers['authorization'];
    if (!authToken) {
        return res.status(401).json({error: 'Not Authenticated'})
    }
    authToken = authToken.split(' ')[1];
    if (!authToken){
        return res.status(401).json({error: 'Not Authenticated'})
    }
    try {
        let decrypted = CryptoJS.AES.decrypt(authToken, 'Hello_Secret').toString(CryptoJS.enc.Utf8);
        decrypted = JSON.parse(decrypted);
        console.log(decrypted);
        if(decrypted===null || decrypted.userId===null || decrypted.userType !== 'ADMIN'){
            return res.status(401).json({error: 'Not Authenticated'})
        }else{
            req.userInfo=decrypted;
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: 'Not Authenticated'})
    }
    
    //Encrypt object using AES encryption
    // //Decrypt object using AES encryption
    // return res.status(200).json(JSON.parse(decrypted));  
}