import express from 'express';
import config from './src/config/config.js';
import router from './src/routes/routes.js';
import sequelize from './src/database/db.js';
const app = express();
app.use(express.json())
app.use('/api',router);
app.get('/',(rq,res)=>{
    res.send('<h1>Hello, world!!</h1>')
});
sequelize.sync().then(()=>{
    app.listen(config.PORT,config.HOST,()=>{
        console.log(`Server Running http://${config.HOST}:${config.PORT}`);
    })
})