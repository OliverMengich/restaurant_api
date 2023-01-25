console.log('Middleware loaded');
import CryptoJS from 'crypto-js';
export default  function(req,res,next){
    console.log(req.body);
    if(req.body.userType && req.body.userType==="ADMIN" && !req.headers["authorization"]){
        console.log("Not Authenticated");
        return res.status(401).json({ error: "Not Authenticated" });
    }else if(req.body.firstName && req.body.lastName && req.body.email && req.body.password && req.body.birthday){
        console.log("I am skipping coz I am a customer")
        next();
    }else{
        console.log("Heeeeeeere")
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
    }
    
    //Encrypt object using AES encryption
    // //Decrypt object using AES encryption
    // return res.status(200).json(JSON.parse(decrypted));  
}
// U2FsdGVkX19Rp6CwahI1WKsTaPcF14GxGV79OTt/00fKPO5KNCweoV5JG3I3I+tEuy+KqaDpVj25dTVl4SPQzuycfQ5p1gSjQZRRhHOFOsN4exIHLel5qadMX7y6cLIpFVAs1SNJzuWqZW8TcmakNtkiLlqcWH2+qWtAbRWbrpQpuAydE7nByfjVKdCUv+/p+fEBPt7za6Q820wLJt6dDg==